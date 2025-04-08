
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Moon, Sun, MessageSquare, Laugh, Globe, HelpCircle, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [humorMode, setHumorMode] = useState(true);
  const [language, setLanguage] = useState('es');
  const { toast } = useToast();

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    // In a real app, this would toggle the theme
    toast({
      title: checked ? "Modo oscuro activado" : "Modo claro activado",
      description: "El tema ha sido actualizado",
    });
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1 text-teal-600">Ajustes</h1>
        <p className="text-muted-foreground">Personaliza tu experiencia en Págame Pues.</p>
      </header>

      <section className="mb-8 space-y-4 animate-fade-in">
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Apariencia</h2>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <Label htmlFor="dark-mode">Modo Oscuro</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <Label htmlFor="language">Idioma</Label>
              </div>
              <Select defaultValue={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Notificaciones</h2>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <Label htmlFor="notifications">Notificaciones</Label>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Experiencia</h2>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Laugh className="h-5 w-5" />
                <div>
                  <Label htmlFor="humor-mode">Modo Humor</Label>
                  <p className="text-xs text-muted-foreground">Mensajes divertidos en la app</p>
                </div>
              </div>
              <Switch
                id="humor-mode"
                checked={humorMode}
                onCheckedChange={setHumorMode}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Ayuda y Soporte</h2>
            
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                <span>Centro de Ayuda</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>Contactar Soporte</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between cursor-pointer text-rose-500">
              <div className="flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground pt-2">
          <p>Págame Pues v1.0.0</p>
          <p>© 2024 Págame Pues. Todos los derechos reservados.</p>
        </div>
      </section>
    </div>
  );
};

export default Settings;
