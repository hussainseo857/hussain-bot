'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { toast } from './Toast';

export type FieldType = 'text' | 'textarea' | 'select' | 'checkbox';

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[]; // for select
  required?: boolean;
  placeholder?: string;
  rows?: number;
  showInList?: boolean;
};

export default function CrudPage({
  table,
  title,
  description,
  fields,
  defaultActiveField = 'is_active',
  searchFields = [],
  orderBy = 'created_at',
  rowKey = 'id',
}: {
  table: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  defaultActiveField?: string | null;
  searchFields?: string[];
  orderBy?: string;
  rowKey?: string;
}) {
  const sb = useMemo(() => createSupabaseBrowserClient(), []);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await sb.from(table).select('*').order(orderBy, { ascending: false }).limit(500);
    if (error) toast('err', error.message);
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [table]);

  const filtered = rows.filter((r) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return searchFields.some((f) => String(r[f] ?? '').toLowerCase().includes(q));
  });

  function openNew() {
    const empty: any = {};
    fields.forEach((f) => { empty[f.key] = f.type === 'checkbox' ? true : ''; });
    setEditing(empty);
    setShowForm(true);
  }

  function openEdit(row: any) {
    setEditing({ ...row });
    setShowForm(true);
  }

  async function save() {
    if (!editing) return;
    for (const f of fields) {
      if (f.required && !String(editing[f.key] ?? '').trim()) {
        toast('err', `${f.label} is required.`);
        return;
      }
    }
    setSaving(true);
    const payload = { ...editing };
    delete payload.created_at;
    delete payload.updated_at;
    let res;
    if (editing[rowKey]) {
      const id = editing[rowKey];
      delete payload[rowKey];
      res = await sb.from(table).update(payload).eq(rowKey, id);
    } else {
      delete payload[rowKey];
      res = await sb.from(table).insert(payload);
    }
    setSaving(false);
    if (res.error) {
      toast('err', res.error.message);
      return;
    }
    toast('ok', 'Saved.');
    setShowForm(false);
    setEditing(null);
    load();
  }

  async function remove(row: any) {
    if (!confirm(`Delete this ${title.toLowerCase().replace(/s$/, '')}?`)) return;
    const { error } = await sb.from(table).delete().eq(rowKey, row[rowKey]);
    if (error) return toast('err', error.message);
    toast('ok', 'Deleted.');
    load();
  }

  async function toggleActive(row: any) {
    if (!defaultActiveField) return;
    const { error } = await sb
      .from(table)
      .update({ [defaultActiveField]: !row[defaultActiveField] })
      .eq(rowKey, row[rowKey]);
    if (error) return toast('err', error.message);
    load();
  }

  const listFields = fields.filter((f) => f.showInList !== false).slice(0, 4);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
        </div>
        <button onClick={openNew} className="btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add new
        </button>
      </div>

      {/* Search */}
      {searchFields.length > 0 && (
        <div className="mt-5 relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="input pl-9"
          />
        </div>
      )}

      {/* Table */}
      <div className="card mt-5 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            <div className="text-slate-700 font-medium">No records yet</div>
            <div className="text-sm">Click “Add new” to create one.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase">
                <tr>
                  {listFields.map((f) => (
                    <th key={f.key} className="text-left px-4 py-3 font-medium">{f.label}</th>
                  ))}
                  {defaultActiveField && <th className="text-left px-4 py-3 font-medium">Active</th>}
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((row) => (
                  <tr key={row[rowKey]} className="hover:bg-slate-50">
                    {listFields.map((f) => (
                      <td key={f.key} className="px-4 py-3 align-top max-w-xs">
                        <div className="line-clamp-2 text-slate-800">{String(row[f.key] ?? '—')}</div>
                      </td>
                    ))}
                    {defaultActiveField && (
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(row)}
                          className={`badge ${row[defaultActiveField] ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}
                        >
                          {row[defaultActiveField] ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                    )}
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => openEdit(row)} className="btn-ghost text-xs"><Pencil className="w-3.5 h-3.5" /> Edit</button>
                      <button onClick={() => remove(row)} className="btn-ghost text-xs text-rose-600 hover:text-rose-700"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && editing && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => !saving && setShowForm(false)}>
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-soft max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">{editing[rowKey] ? 'Edit' : 'Add'} {title.replace(/s$/, '')}</h2>
            </div>
            <div className="p-5 grid sm:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <label className="label">{f.label}{f.required && <span className="text-rose-600"> *</span>}</label>
                  {f.type === 'textarea' ? (
                    <textarea
                      className="input min-h-[100px]"
                      rows={f.rows ?? 4}
                      placeholder={f.placeholder}
                      value={editing[f.key] ?? ''}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                    />
                  ) : f.type === 'select' ? (
                    <select
                      className="input"
                      value={editing[f.key] ?? ''}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                    >
                      <option value="">—</option>
                      {(f.options ?? []).map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : f.type === 'checkbox' ? (
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={!!editing[f.key]}
                        onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
                      />
                      Enabled
                    </label>
                  ) : (
                    <input
                      className="input"
                      placeholder={f.placeholder}
                      value={editing[f.key] ?? ''}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-slate-100 flex justify-end gap-2">
              <button onClick={() => setShowForm(false)} disabled={saving} className="btn-secondary text-sm">Cancel</button>
              <button onClick={save} disabled={saving} className="btn-primary text-sm">
                {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
