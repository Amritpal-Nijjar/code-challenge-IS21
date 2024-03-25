// pages/api/tiles/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';

const tiles = [
    { id: 1, color: 'bg-blue-500', status: 'Out of stock', name: 'Blue' },
  { id: 2, color: 'bg-grey-500', status: 'running low', name: 'Grey' },
  { id: 3, color: 'bg-black', status: 'available', name: 'Black' },
  { id: 4, color: 'bg-white', status: 'available', name: 'White' },
  { id: 5, color: 'bg-purple-500', status: 'available', name: 'Purple' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const tileId = Number(id);

  if (req.method === 'PUT') {
    const { status } = req.body;
    const tileIndex = tiles.findIndex((tile) => tile.id === tileId);

    if (tileIndex !== -1) {
      tiles[tileIndex].status = status;
      res.status(200).json({ message: 'Tile status updated successfully' });
    } else {
      res.status(404).json({ message: 'Tile not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}