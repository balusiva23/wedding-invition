import React from 'react';
import { WeddingConfig, StoryMilestone } from '../../types/wedding';
import { Sparkles, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';

interface StoryEditorProps {
  config: WeddingConfig;
  onUpdate: (updater: (prev: WeddingConfig) => WeddingConfig) => void;
}

export const StoryEditor: React.FC<StoryEditorProps> = ({ config, onUpdate }) => {
  const { storyMilestones } = config;

  const handleAddMilestone = () => {
    const newM: StoryMilestone = {
      id: 'm-' + Date.now(),
      year: new Date().getFullYear().toString(),
      title: 'New Milestone',
      description: 'Describe this memorable moment in your love story...',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
      order: storyMilestones.length + 1,
      enabled: true,
    };
    onUpdate((prev) => ({
      ...prev,
      storyMilestones: [...prev.storyMilestones, newM],
    }));
  };

  const handleUpdateMilestone = (id: string, field: keyof StoryMilestone, value: any) => {
    onUpdate((prev) => ({
      ...prev,
      storyMilestones: prev.storyMilestones.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    }));
  };

  const handleDeleteMilestone = (id: string) => {
    onUpdate((prev) => ({
      ...prev,
      storyMilestones: prev.storyMilestones.filter((m) => m.id !== id),
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= storyMilestones.length) return;

    const list = [...storyMilestones];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    // re-assign orders
    list.forEach((item, idx) => {
      item.order = idx + 1;
    });

    onUpdate((prev) => ({
      ...prev,
      storyMilestones: list,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-amber-200 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Story Timeline Milestones</span>
          </h2>
          <p className="text-xs text-amber-100/60 font-light mt-1">
            Add, reorder, or edit the chapters of your love story.
          </p>
        </div>

        <button
          onClick={handleAddMilestone}
          className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Chapter</span>
        </button>
      </div>

      <div className="space-y-4">
        {storyMilestones.map((m, idx) => (
          <div
            key={m.id}
            className="p-5 rounded-2xl bg-[#1c050a] border border-amber-500/25 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-500/15 pb-3">
              <span className="text-xs font-serif font-bold text-amber-300">
                Chapter #{idx + 1} ({m.year})
              </span>

              <div className="flex items-center space-x-2">
                {/* Enable/Disable */}
                <button
                  onClick={() => handleUpdateMilestone(m.id, 'enabled', !m.enabled)}
                  className={`p-1.5 rounded-lg border text-xs ${
                    m.enabled
                      ? 'border-emerald-500/40 text-emerald-300'
                      : 'border-rose-500/40 text-rose-400'
                  }`}
                  title={m.enabled ? 'Enabled' : 'Hidden'}
                >
                  {m.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                {/* Move Up/Down */}
                <button
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1.5 rounded-lg border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 disabled:opacity-30"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                <button
                  disabled={idx === storyMilestones.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1.5 rounded-lg border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDeleteMilestone(m.id)}
                  className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-serif text-amber-200 mb-1">Year / Tag</label>
                <input
                  type="text"
                  value={m.year}
                  onChange={(e) => handleUpdateMilestone(m.id, 'year', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-serif text-amber-200 mb-1">Milestone Title</label>
                <input
                  type="text"
                  value={m.title}
                  onChange={(e) => handleUpdateMilestone(m.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-1">Description</label>
              <textarea
                rows={2}
                value={m.description}
                onChange={(e) => handleUpdateMilestone(m.id, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 mb-1">Image URL</label>
              <input
                type="text"
                value={m.image || ''}
                onChange={(e) => handleUpdateMilestone(m.id, 'image', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
