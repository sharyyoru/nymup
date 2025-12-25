'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPagesContent } from '@/lib/content';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function LegalPagesAdmin() {
  const pagesContent = getPagesContent();
  const [formData, setFormData] = useState(pagesContent);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log('Saving pages content:', formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updatePrivacySection = (index: number, field: string, value: string) => {
    const newSections = [...formData.privacyPolicy.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData({
      ...formData,
      privacyPolicy: { ...formData.privacyPolicy, sections: newSections },
    });
  };

  const updateCookiesSection = (index: number, field: string, value: string) => {
    const newSections = [...formData.cookiesPolicy.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData({
      ...formData,
      cookiesPolicy: { ...formData.cookiesPolicy, sections: newSections },
    });
  };

  const addPrivacySection = () => {
    setFormData({
      ...formData,
      privacyPolicy: {
        ...formData.privacyPolicy,
        sections: [...formData.privacyPolicy.sections, { title: 'New Section', content: '' }],
      },
    });
  };

  const addCookiesSection = () => {
    setFormData({
      ...formData,
      cookiesPolicy: {
        ...formData.cookiesPolicy,
        sections: [...formData.cookiesPolicy.sections, { title: 'New Section', content: '' }],
      },
    });
  };

  const removePrivacySection = (index: number) => {
    setFormData({
      ...formData,
      privacyPolicy: {
        ...formData.privacyPolicy,
        sections: formData.privacyPolicy.sections.filter((_, i) => i !== index),
      },
    });
  };

  const removeCookiesSection = (index: number) => {
    setFormData({
      ...formData,
      cookiesPolicy: {
        ...formData.cookiesPolicy,
        sections: formData.cookiesPolicy.sections.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Legal Pages</h1>
          <p className="text-gray-600 mt-2">Manage privacy and cookies policies</p>
        </div>
        <Button onClick={handleSave} className="bg-[#c9a96e] hover:bg-[#b8986d]">
          <Save className="w-4 h-4 mr-2" />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="contact">
        <TabsList className="mb-6">
          <TabsTrigger value="contact">Contact Page</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="cookies">Cookies Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Page Settings</CardTitle>
              <CardDescription>Configure the contact page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={formData.contact.pageTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, pageTitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semi Title</Label>
                  <Input
                    value={formData.contact.semiTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, semiTitle: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={formData.contact.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, title: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Image</Label>
                  <Input
                    value={formData.contact.image}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, image: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Submit Button Text</Label>
                <Input
                  value={formData.contact.form.submitText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: {
                        ...formData.contact,
                        form: { ...formData.contact.form, submitText: e.target.value },
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription>Manage privacy policy sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={formData.privacyPolicy.pageTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        privacyPolicy: { ...formData.privacyPolicy, pageTitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Breadcrumb</Label>
                  <Input
                    value={formData.privacyPolicy.breadcrumb}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        privacyPolicy: { ...formData.privacyPolicy, breadcrumb: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              {formData.privacyPolicy.sections.map((section, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Section {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removePrivacySection(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updatePrivacySection(index, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content</Label>
                      <Textarea
                        value={section.content}
                        onChange={(e) => updatePrivacySection(index, 'content', e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addPrivacySection}>
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cookies">
          <Card>
            <CardHeader>
              <CardTitle>Cookies Policy</CardTitle>
              <CardDescription>Manage cookies policy sections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={formData.cookiesPolicy.pageTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cookiesPolicy: { ...formData.cookiesPolicy, pageTitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Breadcrumb</Label>
                  <Input
                    value={formData.cookiesPolicy.breadcrumb}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cookiesPolicy: { ...formData.cookiesPolicy, breadcrumb: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              {formData.cookiesPolicy.sections.map((section, index) => (
                <div key={index} className="p-6 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Section {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeCookiesSection(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updateCookiesSection(index, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Content</Label>
                      <Textarea
                        value={section.content}
                        onChange={(e) => updateCookiesSection(index, 'content', e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addCookiesSection}>
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
