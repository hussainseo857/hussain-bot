'use client';
import CrudPage from '@/components/admin/CrudPage';

export default function TopicsPage() {
  return (
    <CrudPage
      table="allowed_topics"
      title="Allowed Topics"
      description="Topics the chatbot is allowed to discuss."
      searchFields={['topic', 'description']}
      fields={[
        { key: 'topic', label: 'Topic', type: 'text', required: true, showInList: true },
        { key: 'description', label: 'Description', type: 'textarea', rows: 3, showInList: true },
        { key: 'is_active', label: 'Active', type: 'checkbox' },
      ]}
    />
  );
}
