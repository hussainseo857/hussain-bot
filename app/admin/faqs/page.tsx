'use client';
import CrudPage from '@/components/admin/CrudPage';

export default function FAQsPage() {
  return (
    <CrudPage
      table="faqs"
      title="FAQs"
      description="Frequently asked questions used by the chatbot."
      searchFields={['question', 'answer', 'category']}
      fields={[
        { key: 'question', label: 'Question', type: 'text', required: true, showInList: true },
        { key: 'category', label: 'Category', type: 'text', placeholder: 'booking, gear, policy…', showInList: true },
        { key: 'answer', label: 'Answer', type: 'textarea', required: true, rows: 5, showInList: true },
        { key: 'is_active', label: 'Active', type: 'checkbox', showInList: false },
      ]}
    />
  );
}
