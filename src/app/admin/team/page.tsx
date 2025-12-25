'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, Save, X, User, Upload } from 'lucide-react';
import { getTeamContent } from '@/lib/content';

export default function AdminTeamPage() {
  const teamContent = getTeamContent();
  const [members, setMembers] = useState(teamContent.members);
  const [intro, setIntro] = useState(teamContent.intro);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleImageUpload = (memberId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // For demo, we'll use a placeholder path. In production, upload to server/CDN
      // For now, we'll store the file name and assume it's uploaded to /assets/img/team/
      const imagePath = `/assets/img/team/${file.name}`;
      handleMemberChange(memberId, 'image', imagePath);
    };
    reader.readAsDataURL(file);
  };

  const handleIntroChange = (field: string, value: string) => {
    setIntro({ ...intro, [field]: value });
  };

  const handleMemberChange = (id: string, field: string, value: string) => {
    setMembers(members.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const addNewMember = () => {
    const newMember = {
      id: `member-${Date.now()}`,
      name: 'New Team Member',
      role: 'Role Title',
      image: '/assets/img/team/team-placeholder.jpg',
      bio: 'Team member bio goes here.',
      email: '',
      linkedin: ''
    };
    setMembers([...members, newMember]);
    setEditingMember(newMember.id);
  };

  const deleteMember = (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#083d59]">Team Management</h1>
          <p className="text-gray-600 mt-1">Manage team members and page content</p>
        </div>
        <button
          onClick={addNewMember}
          className="flex items-center gap-2 bg-[#a3b18a] hover:bg-[#8a9a73] text-white px-6 py-3 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Team Member
        </button>
      </div>

      {/* Page Intro Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-[#083d59] mb-6">Page Introduction</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Semi Title
            </label>
            <input
              type="text"
              value={intro.semiTitle}
              onChange={(e) => handleIntroChange('semiTitle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a3b18a] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Title
            </label>
            <input
              type="text"
              value={intro.title}
              onChange={(e) => handleIntroChange('title', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a3b18a] focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={intro.description}
              onChange={(e) => handleIntroChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a3b18a] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-[#083d59] mb-6">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Member Image */}
              <div className="relative aspect-[4/3] bg-gray-100">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Member Info */}
              <div className="p-4">
                {editingMember === member.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                      placeholder="Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => handleMemberChange(member.id, 'role', e.target.value)}
                      placeholder="Role"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    {/* Image Upload */}
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        ref={(el) => { fileInputRefs.current[member.id] = el; }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(member.id, file);
                        }}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[member.id]?.click()}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-[#a3b18a] hover:text-[#a3b18a] transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        {member.image ? 'Change Image' : 'Upload Image'}
                      </button>
                      {member.image && (
                        <p className="text-xs text-gray-500 mt-1 truncate">{member.image}</p>
                      )}
                    </div>
                    <textarea
                      value={member.bio}
                      onChange={(e) => handleMemberChange(member.id, 'bio', e.target.value)}
                      placeholder="Bio"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => handleMemberChange(member.id, 'email', e.target.value)}
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <input
                      type="url"
                      value={member.linkedin}
                      onChange={(e) => handleMemberChange(member.id, 'linkedin', e.target.value)}
                      placeholder="LinkedIn URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingMember(null)}
                        className="flex-1 flex items-center justify-center gap-1 bg-[#a3b18a] text-white py-2 rounded text-sm"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingMember(null)}
                        className="flex items-center justify-center gap-1 bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-[#083d59]">{member.name}</h3>
                    <p className="text-[#a3b18a] text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{member.bio}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingMember(member.id)}
                        className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded text-sm transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMember(member.id)}
                        className="flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded text-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="flex items-center gap-2 bg-[#083d59] hover:bg-[#062d42] text-white px-8 py-3 transition-colors font-medium">
          <Save className="w-5 h-5" />
          Save All Changes
        </button>
      </div>
    </div>
  );
}
