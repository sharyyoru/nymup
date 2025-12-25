'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Folder, Image as ImageIcon, Search, Grid, List } from 'lucide-react';
import Image from 'next/image';

const mediaFolders = [
  { name: 'Logos', path: '/assets/img/logo', count: 5 },
  { name: 'Slider Images', path: '/assets/img/slider', count: 2 },
  { name: 'About Images', path: '/assets/img/about', count: 6 },
  { name: 'Portfolio Images', path: '/assets/img/portfolio', count: 12 },
  { name: 'Restaurant Images', path: '/assets/restaurants', count: 25 },
  { name: 'Contact Images', path: '/assets/img/contact', count: 1 },
  { name: 'Footer Images', path: '/assets/img/footer', count: 1 },
  { name: 'Page Title Backgrounds', path: '/assets/img/page-title', count: 1 },
  { name: 'Shapes & Icons', path: '/assets/img/shape', count: 4 },
];

const sampleImages = [
  '/assets/img/logo/logo-2.png',
  '/assets/img/logo/footer-logo-1.png',
  '/assets/restaurants/16s-01.jpg',
  '/assets/restaurants/bkc-01.jpg',
  '/assets/restaurants/dorsia-01.jpg',
  '/assets/restaurants/coup-01.jpg',
];

export default function MediaLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-2">Manage images and assets</p>
        </div>
        <Button className="bg-[#c9a96e] hover:bg-[#b8986d]">
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Search and View Toggle */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex border rounded-lg overflow-hidden">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="rounded-none"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="rounded-none"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Folders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedFolder(null)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedFolder === null
                      ? 'bg-[#c9a96e] text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Folder className="w-4 h-4" />
                  <span>All Media</span>
                </button>
              </li>
              {mediaFolders.map((folder) => (
                <li key={folder.path}>
                  <button
                    onClick={() => setSelectedFolder(folder.path)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      selectedFolder === folder.path
                        ? 'bg-[#c9a96e] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Folder className="w-4 h-4" />
                      <span className="text-sm">{folder.name}</span>
                    </div>
                    <span className="text-xs opacity-60">{folder.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Media Grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedFolder
                  ? mediaFolders.find((f) => f.path === selectedFolder)?.name
                  : 'All Media'}
              </CardTitle>
              <CardDescription>
                Click an image to copy its path to clipboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sampleImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        navigator.clipboard.writeText(image);
                        alert(`Copied: ${image}`);
                      }}
                      className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-[#c9a96e] transition-all"
                    >
                      <Image
                        src={image}
                        alt={`Media ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs px-2 py-1 bg-black/50 rounded">
                          Click to copy path
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {sampleImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        navigator.clipboard.writeText(image);
                        alert(`Copied: ${image}`);
                      }}
                      className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={image}
                          alt={`Media ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm">
                          {image.split('/').pop()}
                        </p>
                        <p className="text-xs text-gray-500">{image}</p>
                      </div>
                      <ImageIcon className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
