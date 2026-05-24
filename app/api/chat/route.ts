import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase/server';
import {
  normalizeMessage,
  detectIntent,
  isPromptInjection,
  extractBookingId,
  searchFAQs,
  searchKnowledgeBase,
  searchDestinations,
  searchTrekkingRoutes,
  searchTravelPackages,
  searchBooking,
  getChatbotSettings,
  buildRestrictedTravelPrompt,
  formatGreetingReply,
  formatFallbackReply,
  formatUnrelatedReply,
  formatInjectionReply,
  formatBookingReply,
  formatBookingNotFound,
  isAllowedTripTrekkerTopic,
} from '@/lib/chat/helpers';
import { generateGeminiReply } from '@/lib/chat/gemini';
import type { Intent } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawMessage: string = typeof body?.message === 'string' ? body.message : '';
    const conversationIdIn: string | undefined =
      typeof body?.conversationId === 'string' ? body.conversationId : undefined;

    // 1. Validate
    const message = rawMessage.slice(0, 1000).trim();
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required.' },
        { status: 400 }
      );
    }

    const sb = createSupabaseServiceClient();

    // 2. Conversation
    let conversationId = conversationIdIn;
    if (!conversationId) {
      const { data: conv, error: convErr } = await sb
        .from('conversations')
        .insert({ user_label: 'web_visitor' })
        .select('id')
        .single();
      if (convErr || !conv) throw convErr ?? new Error('Could not create conversation.');
      conversationId = conv.id;
    }

    // 3. Store user message
    await sb.from('messages').insert({
      conversation_id: conversationId,
      role: 'user',
      content: message,
    });

    const normalized = normalizeMessage(message);
    const intent: Intent = detectIntent(message);
    const settings = await getChatbotSettings();

    const sourcesUsed: string[] = [];
    let reply = '';

    // 4. Prompt injection / unrelated short-circuits
    if (intent === 'prompt_injection' || isPromptInjection(normalized)) {
      reply = formatInjectionReply();
    } else if (intent === 'unrelated') {
      reply = formatUnrelatedReply();
    } else if (intent === 'greeting') {
      reply = formatGreetingReply(settings);
    } else if (intent === 'booking_status') {
      const bookingId = extractBookingId(message);
      if (!bookingId) {
        reply =
          'Sure — please share your booking ID (e.g., **TT1001**) and I will look up the status for you.';
      } else {
        const booking = await searchBooking(bookingId);
        if (booking) {
          sourcesUsed.push('bookings');
          reply = formatBookingReply(booking);
        } else {
          reply = formatBookingNotFound(bookingId, settings?.support_email);
        }
      }
    } else {
      // 5. Grounded retrieval for general travel topics
      const allowed = await isAllowedTripTrekkerTopic(intent);
      if (!allowed) {
        reply = formatUnrelatedReply();
      } else {
        const [faqs, kb, destinations, routes, packages] = await Promise.all([
          searchFAQs(message),
          searchKnowledgeBase(message),
          searchDestinations(message),
          searchTrekkingRoutes(message),
          searchTravelPackages(message),
        ]);

        if (faqs.length) sourcesUsed.push('faq');
        if (kb.length) sourcesUsed.push('knowledge_base');
        if (destinations.length) sourcesUsed.push('destinations');
        if (routes.length) sourcesUsed.push('trekking_routes');
        if (packages.length) sourcesUsed.push('travel_packages');

        const hasContext =
          faqs.length + kb.length + destinations.length + routes.length + packages.length > 0;

        if (!hasContext) {
          reply = formatFallbackReply(settings);
        } else {
          const prompt = buildRestrictedTravelPrompt(message, {
            settings,
            faqs,
            kb,
            destinations,
            routes,
            packages,
            intent,
          });
          try {
            reply = await generateGeminiReply(prompt);
          } catch (err) {
            console.error('Gemini error:', err);
            reply =
              'Trip Trekker assistant is temporarily unavailable. Please contact support.';
          }
        }
      }
    }

    // 6. Store assistant message
    await sb.from('messages').insert({
      conversation_id: conversationId,
      role: 'assistant',
      content: reply,
    });

    return NextResponse.json({
      reply,
      conversationId,
      intent,
      sourcesUsed,
    });
  } catch (err: any) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      {
        reply:
          'Trip Trekker assistant is temporarily unavailable. Please contact support.',
        error: 'internal_error',
      },
      { status: 500 }
    );
  }
}
