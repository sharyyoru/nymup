'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getInvestmentsContent } from '@/lib/content';
import { Plus, Trash2, Save, Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function InvestmentsAdmin() {
  const investmentsContent = getInvestmentsContent();
  const [formData, setFormData] = useState(investmentsContent);
  const [saved, setSaved] = useState(false);
  const [editingItem, setEditingItem] = useState<number | null>(null);

  const handleSave = () => {
    console.log('Saving investments content:', formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      newItems[index] = {
        ...newItems[index],
        [parent]: { ...(newItems[index] as any)[parent], [child]: value },
      };
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    const newItem = {
      id: `new-${Date.now()}`,
      slug: `new-investment-${Date.now()}`,
      name: 'New Investment',
      location: 'Location',
      thumbnail: '/assets/restaurants/placeholder.jpg',
      heroImage: '/assets/restaurants/placeholder.jpg',
      story: { title: 'Our Story', content: '', additional: '' },
      vision: { title: 'Our Vision', content: '' },
      gallery: [],
      features: [],
    };
    setFormData({ ...formData, items: [...formData.items, newItem] });
    setEditingItem(formData.items.length);
  };

  const removeItem = (index: number) => {
    if (confirm('Are you sure you want to delete this investment?')) {
      setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Investments</h1>
          <p className="text-gray-600 mt-2">Manage portfolio items</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={addItem}>
            <Plus className="w-4 h-4 mr-2" />
            Add Investment
          </Button>
          <Button onClick={handleSave} className="bg-[#c9a96e] hover:bg-[#b8986d]">
            <Save className="w-4 h-4 mr-2" />
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Page Settings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Page Settings</CardTitle>
          <CardDescription>Configure the investments page header</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input
                value={formData.pageTitle}
                onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Hero Image</Label>
              <Input
                value={formData.heroImage}
                onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Intro Content</Label>
            <Textarea
              value={formData.intro.content}
              onChange={(e) =>
                setFormData({ ...formData, intro: { ...formData.intro, content: e.target.value } })
              }
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Investment Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formData.items.map((item, index) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={item.thumbnail}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription>{item.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit {item.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            value={item.name}
                            onChange={(e) => updateItem(index, 'name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Slug</Label>
                          <Input
                            value={item.slug}
                            onChange={(e) => updateItem(index, 'slug', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Thumbnail</Label>
                          <Input
                            value={item.thumbnail}
                            onChange={(e) => updateItem(index, 'thumbnail', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Hero Image</Label>
                          <Input
                            value={item.heroImage}
                            onChange={(e) => updateItem(index, 'heroImage', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Story Title</Label>
                        <Input
                          value={item.story.title}
                          onChange={(e) => updateItem(index, 'story.title', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Story Content</Label>
                        <Textarea
                          value={item.story.content}
                          onChange={(e) => updateItem(index, 'story.content', e.target.value)}
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Story Additional</Label>
                        <Textarea
                          value={item.story.additional}
                          onChange={(e) => updateItem(index, 'story.additional', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Vision Title</Label>
                        <Input
                          value={item.vision.title}
                          onChange={(e) => updateItem(index, 'vision.title', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Vision Content</Label>
                        <Textarea
                          value={item.vision.content}
                          onChange={(e) => updateItem(index, 'vision.content', e.target.value)}
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gallery Images (comma separated paths)</Label>
                        <Textarea
                          value={item.gallery.join(', ')}
                          onChange={(e) =>
                            updateItem(
                              index,
                              'gallery',
                              e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                            )
                          }
                          rows={2}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Link href={`/investments/${item.slug}`} target="_blank">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => removeItem(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
