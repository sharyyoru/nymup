'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAboutContent } from '@/lib/content';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function AboutPageAdmin() {
  const aboutContent = getAboutContent();
  const [formData, setFormData] = useState(aboutContent);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log('Saving about page content:', formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updatePillar = (index: number, field: string, value: string) => {
    const newPillars = [...formData.mainContent.pillars];
    newPillars[index] = { ...newPillars[index], [field]: value };
    setFormData({
      ...formData,
      mainContent: { ...formData.mainContent, pillars: newPillars },
    });
  };

  const updateSection = (index: number, field: string, value: string) => {
    const newSections = [...formData.mainContent.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData({
      ...formData,
      mainContent: { ...formData.mainContent, sections: newSections },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Page</h1>
          <p className="text-gray-600 mt-2">Manage about page content</p>
        </div>
        <Button onClick={handleSave} className="bg-[#c9a96e] hover:bg-[#b8986d]">
          <Save className="w-4 h-4 mr-2" />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="mb-6">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="content">Main Content</TabsTrigger>
          <TabsTrigger value="pillars">Pillars</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Edit the about page hero section</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={formData.pageTitle}
                    onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Breadcrumb</Label>
                  <Input
                    value={formData.breadcrumb}
                    onChange={(e) => setFormData({ ...formData, breadcrumb: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Semi Title</Label>
                  <Input
                    value={formData.heroSection.semiTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        heroSection: { ...formData.heroSection, semiTitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={formData.heroSection.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        heroSection: { ...formData.heroSection, title: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description (HTML supported)</Label>
                <Textarea
                  value={formData.heroSection.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroSection: { ...formData.heroSection, description: e.target.value },
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Content (HTML supported)</Label>
                <Textarea
                  value={formData.heroSection.content}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroSection: { ...formData.heroSection, content: e.target.value },
                    })
                  }
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Image Path</Label>
                <Input
                  value={formData.heroSection.image}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      heroSection: { ...formData.heroSection, image: e.target.value },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Main Content Sections</CardTitle>
              <CardDescription>Edit the main content sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Hero Image</Label>
                <Input
                  value={formData.mainContent.heroImage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mainContent: { ...formData.mainContent, heroImage: e.target.value },
                    })
                  }
                />
              </div>
              {formData.mainContent.sections.map((section, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold mb-4">Section {index + 1}</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content</Label>
                      <Textarea
                        value={section.content}
                        onChange={(e) => updateSection(index, 'content', e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pillars">
          <Card>
            <CardHeader>
              <CardTitle>Company Pillars</CardTitle>
              <CardDescription>Edit the company values and pillars</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.mainContent.pillars.map((pillar, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Number</Label>
                      <Input
                        value={pillar.number}
                        onChange={(e) => updatePillar(index, 'number', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={pillar.title}
                        onChange={(e) => updatePillar(index, 'title', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label>Content</Label>
                    <Textarea
                      value={pillar.content}
                      onChange={(e) => updatePillar(index, 'content', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Gallery Images</CardTitle>
              <CardDescription>Manage gallery images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Gallery 1 (comma separated paths)</Label>
                <Textarea
                  value={formData.mainContent.gallery.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mainContent: {
                        ...formData.mainContent,
                        gallery: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Gallery 2 (comma separated paths)</Label>
                <Textarea
                  value={formData.mainContent.gallery2.join(', ')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mainContent: {
                        ...formData.mainContent,
                        gallery2: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      },
                    })
                  }
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
