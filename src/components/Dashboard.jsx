import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, MessageSquare, Clock } from 'lucide-react';
import io from 'socket.io-client';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalMessages: 0,
    activeChats: 0,
    avgResponseTime: '0h'
  });

  const [messageStats, setMessageStats] = useState([
    { day: 'Seg', sent: 45, received: 52 },
    { day: 'Ter', sent: 52, received: 48 },
    { day: 'Qua', sent: 48, received: 61 },
    { day: 'Qui', sent: 61, received: 55 },
    { day: 'Sex', sent: 55, received: 67 },
    { day: 'Sab', sent: 40, received: 43 },
    { day: 'Dom', sent: 30, received: 35 }
  ]);

  const [contactsData, setContactsData] = useState([
    { month: 'Jan', contacts: 40 },
    { month: 'Fev', contacts: 45 },
    { month: 'Mar', contacts: 52 },
    { month: 'Abr', contacts: 60 },
    { month: 'Mai', contacts: 55 },
    { month: 'Jun', contacts: 70 }
  ]);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('dashboard-update', (data) => {
      setStats(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard CRM</h1>
        <p className="text-gray-600 mt-2">Bem-vindo ao painel de controle WhatsApp</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="w-8 h-8" />}
          title="Contatos Totais"
          value={stats.totalContacts}
          color="blue"
        />
        <StatCard
          icon={<MessageSquare className="w-8 h-8" />}
          title="Mensagens"
          value={stats.totalMessages}
          color="green"
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8" />}
          title="Chats Ativos"
          value={stats.activeChats}
          color="purple"
        />
        <StatCard
          icon={<Clock className="w-8 h-8" />}
          title="Tempo Médio"
          value={stats.avgResponseTime}
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Mensagens por Dia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={messageStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sent" fill="#3b82f6" name="Enviadas" />
              <Bar dataKey="received" fill="#10b981" name="Recebidas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Contacts Growth Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Crescimento de Contatos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={contactsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="contacts" stroke="#8b5cf6" name="Contatos" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className={`${colorClasses[color]} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
};

export default Dashboard;
