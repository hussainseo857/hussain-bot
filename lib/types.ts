// Database row types used across the app.

export type ChatbotSettings = {
  id: string;
  business_name: string;
  bot_name: string;
  welcome_message: string;
  fallback_message: string;
  primary_color: string | null;
  support_email: string | null;
  support_phone: string | null;
  business_hours: string | null;
  office_location: string | null;
};

export type AllowedTopic = {
  id: string;
  topic: string;
  description: string | null;
  is_active: boolean;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  is_active: boolean;
};

export type KBArticle = {
  id: string;
  title: string;
  content: string;
  category: string | null;
  is_active: boolean;
};

export type Destination = {
  id: string;
  name: string;
  country: string | null;
  region: string | null;
  description: string | null;
  best_season: string | null;
  difficulty_level: string | null;
  estimated_budget: string | null;
  highlights: string | null;
  safety_notes: string | null;
  is_active: boolean;
};

export type TrekkingRoute = {
  id: string;
  route_name: string;
  destination: string | null;
  duration: string | null;
  difficulty_level: string | null;
  altitude: string | null;
  route_summary: string | null;
  required_gear: string | null;
  safety_notes: string | null;
  best_season: string | null;
  is_active: boolean;
};

export type TravelPackage = {
  id: string;
  package_name: string;
  destination: string | null;
  duration: string | null;
  price_range: string | null;
  included_services: string | null;
  excluded_services: string | null;
  cancellation_policy: string | null;
  payment_policy: string | null;
  is_active: boolean;
};

export type SampleBooking = {
  id: string;
  booking_id: string;
  customer_name: string | null;
  package_name: string | null;
  destination: string | null;
  status: string | null;
  travel_date: string | null;
  payment_status: string | null;
  notes: string | null;
};

export type Conversation = {
  id: string;
  user_label: string | null;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
};

export type Intent =
  | 'greeting'
  | 'destination_info'
  | 'trekking_route'
  | 'travel_package'
  | 'booking_status'
  | 'trip_planning'
  | 'safety_guidance'
  | 'gear_checklist'
  | 'best_season'
  | 'payment'
  | 'cancellation_refund'
  | 'business_hours'
  | 'contact_support'
  | 'faq'
  | 'unrelated'
  | 'prompt_injection'
  | 'unknown';
