// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface Tile {
  id: number;
  color: string;
  status: 'Out of stock' | 'running low' | 'available';
  name: string;
}

type Status = 'Out of stock' | 'running low' | 'available';

const initialTiles: Tile[] = [
  { id: 1, color: 'bg-blue-500', status: 'Out of stock', name: 'Blue' },
  { id: 2, color: 'bg-grey-500', status: 'running low', name: 'Grey' },
  { id: 3, color: 'bg-black', status: 'available', name: 'Black' },
  { id: 4, color: 'bg-white', status: 'available', name: 'White' },
  { id: 5, color: 'bg-purple-500', status: 'available', name: 'Purple' },
];

const statusColors: Record<Status, string> = {
  'Out of stock': 'bg-red-500',
  'running low': 'bg-yellow-500', 
  'available': 'bg-green-500',
};


const Home: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);

  useEffect(() => {
    // Fetch tiles from the API
    fetch('/api/tiles')
      .then((res) => res.json())
      .then((data: Tile[]) => setTiles(data))
      .catch((error) => console.error('Error fetching tiles:', error));
  }, []);

  const updateTileStatus = async (id: number, status: Tile['status']) => {
    try {
      await fetch(`/api/tiles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      setTiles((prevTiles) =>
        prevTiles.map((tile) => (tile.id === id ? { ...tile, status } : tile))
      );
    } catch (error) {
      console.error('Error updating tile status:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Paint Status Kanban Board</h1>
      <div className="grid grid-cols-3 gap-4">
        {['Out of stock', 'running low', 'available'].map((status) => (
          <div
            key={status}
            className={`${statusColors[status as Status]} p-4`}

          >
            <h2 className="text-xl font-bold mb-2 capitalize">{status}</h2>
            {tiles
              .filter((tile) => tile.status === status)
              .map((tile) => (
                <div
                  key={tile.id}
                  className={`p-4 mb-2 ${tile.color} ${tile.color === 'bg-white' ? 'text-black' : 'text-white'} cursor-pointer`}
                  onClick={() =>
                    updateTileStatus(
                      tile.id,
                      status === 'Out of stock'
                        ? 'running low'
                        : status === 'running low'
                        ? 'available'
                        : 'Out of stock'
                    )
                  }
                >
                  {tile.name}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
  
                }
export default Home;