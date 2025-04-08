
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { X, UserPlus, Link as LinkIcon, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data
const initialMembers = [
  { id: '1', name: 'Carlos', email: 'carlos@example.com', isAdmin: true },
  { id: '2', name: 'Ana', email: 'ana@example.com', isAdmin: false },
  { id: '3', name: 'Miguel', email: 'miguel@example.com', isAdmin: false },
  { id: '4', name: 'Laura', email: 'laura@example.com', isAdmin: false },
];

const GroupManagement = () => {
  const [groupName, setGroupName] = useState('Casa Juárez');
  const [isEditing, setIsEditing] = useState(false);
  const [members, setMembers] = useState(initialMembers);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const { toast } = useToast();

  const handleRemoveMember = (id: string) => {
    // Don't allow removing yourself (first member is considered self)
    if (id === '1') {
      toast({
        title: "No puedes eliminarte a ti mismo",
        description: "Debes permanecer como miembro del grupo",
        variant: "destructive"
      });
      return;
    }
    
    setMembers(members.filter(member => member.id !== id));
  };

  const handleInvite = () => {
    if (!newMemberEmail || !newMemberEmail.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un correo electrónico válido",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send an invitation
    toast({
      title: "Invitación enviada",
      description: `Se ha enviado una invitación a ${newMemberEmail}`,
    });
    setNewMemberEmail('');
  };

  const handleShareGroup = () => {
    // In a real app, this would generate and copy a sharing link
    toast({
      title: "Enlace copiado",
      description: "Enlace de invitación copiado al portapapeles",
    });
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-teal-600">Administrar Grupo</h1>
        <p className="text-muted-foreground">Añade o elimina miembros de tu grupo de gastos compartidos.</p>
      </header>

      <section className="mb-8 animate-fade-in">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              {isEditing ? (
                <Input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="font-semibold"
                />
              ) : (
                <h2 className="text-xl font-semibold">{groupName}</h2>
              )}
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
            
            {isEditing && (
              <div className="mb-4 flex justify-end">
                <Button 
                  onClick={() => setIsEditing(false)}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  Guardar Nombre
                </Button>
              </div>
            )}
            
            <div className="mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handleShareGroup}
              >
                <LinkIcon className="h-4 w-4" />
                Compartir Enlace del Grupo
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Miembros del Grupo</h3>
              
              {members.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center justify-between py-2 border-b last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        {member.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {member.name}
                        {member.isAdmin && (
                          <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                            Admin
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8 animate-slide-up">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Añadir Nuevo Miembro</h3>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
              <Button 
                className="bg-teal-500 hover:bg-teal-600 shrink-0"
                onClick={handleInvite}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invitar
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default GroupManagement;
