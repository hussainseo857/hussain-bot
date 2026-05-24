'use client';
import CrudPage from '@/components/admin/CrudPage';

export default function KnowledgePage() {
  return (
    <CrudPage
      table="knowledge_base"
      title="Knowledge Base"
      description="Long-form articles the chatbot can use as grounded context."
      searchFields={['title', 'content', 'category']}
      fields={[
        { key: 'title', label: 'Title', type: 'text', required: true, showInList: true },
        { key: 'category', label: 'Category', type: 'text', showInList: true },
        { key: 'content', label: 'Content', type: 'textarea', required: true, rows: 8, showInList: true },
        { key: 'is_active', label: 'Active', type: 'checkbox', showInList: false },
      ]}
    />
  );
}
