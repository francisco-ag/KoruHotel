import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    admin: { email: 'admin@hotelguest.com', password: 'admin123', role: 'Administrador' },
    recepcionista: { email: 'maria.gonzalez@hotelguest.com', password: 'recep123', role: 'Recepcionista' },
    manager: { email: 'carlos.manager@hotelguest.com', password: 'manager123', role: 'Gerente' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials against mock data
      const validCredential = Object.values(mockCredentials)?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (validCredential) {
        // Store user session data
        localStorage.setItem('hotelguest_user', JSON.stringify({
          email: validCredential?.email,
          role: validCredential?.role,
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        }));

        // Redirect to dashboard
        navigate('/dashboard-principal');
      } else {
        setErrors({
          general: 'Credenciales incorrectas. Verifique su correo y contraseña.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Error de conexión. Intente nuevamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Funcionalidad de recuperación de contraseña próximamente disponible.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <p className="text-sm text-error font-medium">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <Input
            type="email"
            name="email"
            label="Correo Electrónico"
            placeholder="usuario@hotelguest.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              disabled={isLoading}
              className="w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
              disabled={isLoading}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            name="rememberMe"
            label="Recordar credenciales"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            disabled={isLoading}
          >
            ¿Olvidé mi contraseña?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName="LogIn"
          iconPosition="left"
          className="mt-8"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Credenciales de demostración:</p>
              <p><strong>Admin:</strong> admin@hotelguest.com / admin123</p>
              <p><strong>Recepcionista:</strong> maria.gonzalez@hotelguest.com / recep123</p>
              <p><strong>Gerente:</strong> carlos.manager@hotelguest.com / manager123</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;