import { Product } from './types';

export const products: Product[] = [
    { id: '1', name: 'Cáp mạng Cat6 UTP Commscope', image: 'https://images.unsplash.com/photo-1558467523-46113f1fef72?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Commscope', cableType: 'Cat6', shielding: 'UTP', environment: 'Indoor', price: 1500000 },
    { id: '2', name: 'Cáp mạng Cat5e FTP Alantek', image: 'https://images.unsplash.com/photo-1544160358-004cb68019ab?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Alantek', cableType: 'Cat5e', shielding: 'FTP', environment: 'Outdoor', price: 1200000 },
    { id: '3', name: 'Cáp mạng Cat6A SFTP LS', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba326b?auto=format&fit=crop&q=80&w=300&h=300', brand: 'LS', cableType: 'Cat6A', shielding: 'SFTP', environment: 'Underground', price: 3500000 },
    { id: '4', name: 'Cáp mạng Cat7 S/FTP Belden', image: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Belden', cableType: 'Cat7', shielding: 'S/FTP', environment: 'Suspended', price: 5500000 },
    { id: '5', name: 'Cáp mạng Cat6 UTP Vinacap', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Vinacap', cableType: 'Cat6', shielding: 'UTP', environment: 'Indoor', price: 1300000 },
    { id: '6', name: 'Cáp mạng Cat5e UTP Commscope', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Commscope', cableType: 'Cat5e', shielding: 'UTP', environment: 'Indoor', price: 900000 },
    { id: '7', name: 'Cáp mạng Cat6 UTP Golden Link', image: 'https://images.unsplash.com/photo-1563770660941-20978e870813?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Golden Link', cableType: 'Cat6', shielding: 'UTP', environment: 'Indoor', price: 0 },
    { id: '8', name: 'Cáp mạng Cat6A U/UTP Norden', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Norden', cableType: 'Cat6A', shielding: 'UTP', environment: 'Indoor', price: 1800000 },
    { id: '9', name: 'Cáp mạng Cat6 FTP Commscope', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Commscope', cableType: 'Cat6', shielding: 'FTP', environment: 'Outdoor', price: 1950000 },
    { id: '10', name: 'Cáp mạng Cat5e UTP Vinacap (Mới)', image: 'https://images.unsplash.com/photo-1515343483120-f9995c739e03?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Vinacap', cableType: 'Cat5e', shielding: 'UTP', environment: 'Indoor', price: 850000 },
    { id: '11', name: 'Cáp mạng Cat6 SFTP Alantek Outdoor', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Alantek', cableType: 'Cat6', shielding: 'SFTP', environment: 'Outdoor', price: 2800000 },
    { id: '12', name: 'Cáp mạng Cat6A S/FTP LS Vina', image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=300&h=300', brand: 'LS', cableType: 'Cat6A', shielding: 'S/FTP', environment: 'Indoor', price: 3200000 },
    { id: '13', name: 'Cáp mạng Cat5e UTP Golden Link Taiwan', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Golden Link', cableType: 'Cat5e', shielding: 'UTP', environment: 'Indoor', price: 750000 },
    { id: '14', name: 'Cáp mạng Cat6 UTP Norden HighSpeed', image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Norden', cableType: 'Cat6', shielding: 'UTP', environment: 'Indoor', price: 1600000 },
    { id: '15', name: 'Cáp mạng Cat6A FTP Commscope Shielded', image: 'https://images.unsplash.com/photo-1461747823400-485cf33b847f?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Commscope', cableType: 'Cat6A', shielding: 'FTP', environment: 'Indoor', price: 2400000 },
    { id: '16', name: 'Cáp mạng Cat6 FTP Alantek Shielded', image: 'https://images.unsplash.com/photo-1525373612132-b3e8bf0ea85f?auto=format&fit=crop&q=80&w=300&h=300', brand: 'Alantek', cableType: 'Cat6', shielding: 'FTP', environment: 'Indoor', price: 1850000 },
];

export const filterOptions = {
    brands: ['Commscope', 'Alantek', 'LS', 'Belden', 'Vinacap', 'Golden Link', 'Norden'],
    cableTypes: ['Cat5e', 'Cat6', 'Cat6A', 'Cat7'],
    shielding: ['UTP', 'FTP', 'SFTP', 'S/FTP'],
    environments: ['Indoor', 'Outdoor', 'Suspended', 'Underground']
};
