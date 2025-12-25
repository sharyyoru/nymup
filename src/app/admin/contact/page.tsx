'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSiteContent, getPagesContent } from '@/lib/content';
import { Save, Mail, MapPin, Phone } from 'lucide-react';

export default function ContactSettingsPage() {
  const siteContent = getSiteContent();
  const pagesContent = getPagesContent();
  const [siteData, setSiteData] = useState(siteContent);
  const [contactPageData, setContactPageData] = useState(pagesContent.contact);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    console.log('Saving contact settings:', { siteData, contactPageData });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Settings</h1>
          <p className="text-gray-600 mt-2">Manage contact information and form settings</p>
        </div>
        <Button onClick={handleSave} className="bg-[#c9a96e] hover:bg-[#b8986d]">
          <Save className="w-4 h-4 mr-2" />
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="info">
        <TabsList className="mb-6">
          <TabsTrigger value="info">Contact Information</TabsTrigger>
          <TabsTrigger value="page">Contact Page</TabsTrigger>
          <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#c9a96e]" />
                  Email Settings
                </CardTitle>
                <CardDescription>Primary contact email address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={siteData.contact.email}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        contact: { ...siteData.contact, email: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#c9a96e]" />
                  Address Settings
                </CardTitle>
                <CardDescription>Business address and location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    value={siteData.contact.address}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        contact: { ...siteData.contact, address: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Google Maps Link</Label>
                  <Input
                    value={siteData.contact.addressLink}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        contact: { ...siteData.contact, addressLink: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="page">
          <Card>
            <CardHeader>
              <CardTitle>Contact Page Content</CardTitle>
              <CardDescription>Configure the contact page layout and text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Page Title</Label>
                  <Input
                    value={contactPageData.pageTitle}
                    onChange={(e) =>
                      setContactPageData({ ...contactPageData, pageTitle: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Breadcrumb Text</Label>
                  <Input
                    value={contactPageData.breadcrumb}
                    onChange={(e) =>
                      setContactPageData({ ...contactPageData, breadcrumb: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Semi Title</Label>
                  <Input
                    value={contactPageData.semiTitle}
                    onChange={(e) =>
                      setContactPageData({ ...contactPageData, semiTitle: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={contactPageData.title}
                    onChange={(e) =>
                      setContactPageData({ ...contactPageData, title: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Contact Image</Label>
                  <Input
                    value={contactPageData.image}
                    onChange={(e) =>
                      setContactPageData({ ...contactPageData, image: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Submit Button Text</Label>
                  <Input
                    value={contactPageData.form.submitText}
                    onChange={(e) =>
                      setContactPageData({
                        ...contactPageData,
                        form: { ...contactPageData.form, submitText: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle>Form Submissions</CardTitle>
              <CardDescription>Recent contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No submissions yet</p>
                <p className="text-sm">Form submissions will appear here once integrated with a backend.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
