
import React from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  component: React.FC;
  isVisible: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  isPublished: boolean;
}
