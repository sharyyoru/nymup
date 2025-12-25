'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getHomeContent } from '@/lib/content';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';

export default function HomePageAdmin() {
  const homeContent = getHomeContent();
  const [formData, setFormData] = useState(homeContent);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log('Saving home page content:', formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateSlide = (index: number, field: string, value: string | string[]) => {
    const newSlides = [...formData.hero.slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setFormData({ ...formData, hero: { ...formData.hero, slides: newSlides } });
  };

  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      backgroundImage: '',
      tags: ['Luxury', 'Business', 'Experiences'],
      title: 'New Slide Title',
      buttonText: '',
      buttonLink: '',
    };
    setFormData({
      ...formData,
      hero: { ...formData.hero, slides: [...formData.hero.slides, newSlide] },
    });
  };

  const removeSlide = (index: number) => {
    setFormData({
      ...formData,
      hero: { ...formData.hero, slides: formData.hero.slides.filter((_, i) => i !== index) },
    });
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...formData.about.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData({ ...formData, about: { ...formData.about, features: newFeatures } });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Home Page</h1>
          <p className="text-gray-600 mt-2">Manage hero slider and about section</p>
        </div>
        <Button onClick={handleSave} className="bg-[#c9a96e] hover:bg-[#b8986d]">
          <Save className="w-4 h-4 mr-2" />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="mb-6">
          <TabsTrigger value="hero">Hero Slider</TabsTrigger>
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Hero Slides</CardTitle>
              <CardDescription>Manage the homepage hero slider</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {formData.hero.slides.map((slide, index) => (
                  <div key={slide.id} className="p-6 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-5 h-5 text-gray-400" />
                        <h4 className="font-semibold">Slide {index + 1}</h4>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => removeSlide(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={slide.title}
                          onChange={(e) => updateSlide(index, 'title', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Background Image</Label>
                        <Input
                          value={slide.backgroundImage}
                          onChange={(e) => updateSlide(index, 'backgroundImage', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Button Text</Label>
                        <Input
                          value={slide.buttonText}
                          onChange={(e) => updateSlide(index, 'buttonText', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Button Link</Label>
                        <Input
                          value={slide.buttonLink}
                          onChange={(e) => updateSlide(index, 'buttonLink', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Tags (comma separated)</Label>
                        <Input
                          value={slide.tags.join(', ')}
                          onChange={(e) =>
                            updateSlide(
                              index,
                              'tags',
                              e.target.value.split(',').map((t) => t.trim())
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addSlide}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Slide
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>Edit the about section content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Semi Title</Label>
                  <Input
                    value={formData.about.semiTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, semiTitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={formData.about.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, title: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description (HTML supported)</Label>
                <Textarea
                  value={formData.about.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, description: e.target.value },
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Highlight Title</Label>
                  <Input
                    value={formData.about.highlight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, highlight: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image Path</Label>
                  <Input
                    value={formData.about.image}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, image: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Highlight Text</Label>
                <Textarea
                  value={formData.about.highlightText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about: { ...formData.about, highlightText: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={formData.about.buttonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, buttonText: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button Link</Label>
                  <Input
                    value={formData.about.buttonLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        about: { ...formData.about, buttonLink: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Cards</CardTitle>
              <CardDescription>Manage the about section feature cards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {formData.about.features.map((feature, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-lg border">
                    <h4 className="font-semibold mb-4">Feature {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={feature.title}
                          onChange={(e) => updateFeature(index, 'title', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subtitle</Label>
                        <Input
                          value={feature.subtitle}
                          onChange={(e) => updateFeature(index, 'subtitle', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Image Path</Label>
                        <Input
                          value={feature.image}
                          onChange={(e) => updateFeature(index, 'image', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Link</Label>
                        <Input
                          value={feature.link}
                          onChange={(e) => updateFeature(index, 'link', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
