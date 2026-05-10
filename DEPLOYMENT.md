# 🚀 GUÍA DE DESPLIEGUE - CRM VENTAS PRO

## 📋 Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Opción 1: Despliegue en Firebase Hosting](#opción-1-firebase-hosting)
3. [Opción 2: Despliegue en Servidor Web](#opción-2-servidor-web)
4. [Opción 3: Despliegue Local](#opción-3-despliegue-local)
5. [Configuración Post-Despliegue](#configuración-post-despliegue)
6. [Troubleshooting](#troubleshooting)

---

## ✅ Requisitos Previos

### Software Necesario
- [ ] Navegador web moderno (Chrome, Firefox, Safari, Edge)
- [ ] Cuenta en Firebase (gratuita)
- [ ] Acceso a tu servidor web o hosting

### Archivos Necesarios
- [ ] `index.html` - Dashboard principal
- [ ] `admin.html` - Panel de administración
- [ ] `generador-ofertas.html` - Generador de ofertas
- [ ] `reports.html` - Reportes
- [ ] `MM-Logo-N.png` - Logo
- [ ] `README.md` - Documentación
- [ ] `config.js` - Configuración

---

## 🔥 OPCIÓN 1: FIREBASE HOSTING (⭐ RECOMENDADO)

### Ventajas
✅ Hosting gratis y seguro
✅ HTTPS automático
✅ CDN global
✅ Escalable automáticamente
✅ Integración perfecta con Firebase

### Pasos

#### Paso 1: Instalar Firebase CLI
```bash
# En macOS/Linux
npm install -g firebase-tools

# En Windows (PowerShell como Admin)
npm install -g firebase-tools
```

#### Paso 2: Autenticarse con Firebase
```bash
firebase login
```

#### Paso 3: Inicializar Proyecto
```bash
# En la carpeta Ventas-MM-Enhanced/
firebase init

# Seleccionar opción "Hosting"
# Seleccionar tu proyecto existente (ventas-ebd49)
# Directorio público: . (punto)
# Single page app: Y (Sí)
```

#### Paso 4: Desplegar
```bash
firebase deploy
```

**¡Listo!** Tu CRM estará disponible en:
```
https://ventas-ebd49.web.app
```

### Actualizar Despliegue
Cada vez que hagas cambios:
```bash
firebase deploy
```

---

## 🌐 OPCIÓN 2: SERVIDOR WEB (Apache/Nginx)

### Requisitos
- [ ] Servidor web configurado
- [ ] Acceso SSH o FTP
- [ ] Dominio o IP del servidor

### Pasos

#### Paso 1: Subir Archivos por FTP
```
Conectar con FTP a tu servidor
Carpeta destino: /public_html/ o /www/

Subir archivos:
├── index.html
├── admin.html
├── generador-ofertas.html
├── reports.html
├── MM-Logo-N.png
├── config.js
└── README.md
```

#### Paso 2: Configurar .htaccess (Apache)
Crear archivo `.htaccess` en la raíz:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Redirigir 404 a index.html para SPA
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

# Comprensión gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache de navegador
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType text/javascript "access plus 1 week"
</IfModule>
```

#### Paso 3: Configurar Nginx
En `/etc/nginx/sites-enabled/default`:

```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/html;

    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tu-dominio.com;
    root /var/www/html;

    ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;

    # Índice
    index index.html;

    # SPA
    location / {
        try_files $uri /index.html;
    }

    # Cache de recursos estáticos
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1m;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/html text/css text/javascript application/javascript;
}
```

#### Paso 4: SSL (HTTPS)
```bash
# Usar Let's Encrypt (gratis)
sudo certbot certonly -a certbot-nginx:nginx -d tu-dominio.com

# O comprar certificado en tu proveedor
```

#### Paso 5: Reiniciar Servidor
```bash
# Apache
sudo systemctl restart apache2

# Nginx
sudo systemctl restart nginx
```

**Acceso:** `https://tu-dominio.com`

---

## 💻 OPCIÓN 3: DESPLIEGUE LOCAL

### Para Desarrollo/Testing

#### Windows
```bash
# Instalar Python
python -m http.server 8000

# O usar Node.js
npx http-server
```

#### macOS/Linux
```bash
# Con Python 3
python3 -m http.server 8000

# O con Node.js
npx http-server
```

**Acceso local:** `http://localhost:8000`

---

## ⚙️ CONFIGURACIÓN POST-DESPLIEGUE

### 1. Verificar Firebase
Abre Firebase Console:
```
https://console.firebase.google.com/
Proyecto: ventas-ebd49
```

Verifica:
- [ ] Firestore está activo
- [ ] Authentication está configurado
- [ ] Google Sign-In está habilitado

### 2. Configurar Seguridad de Firestore
En Firebase Console > Firestore > Reglas:

```firebase
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Permitir lectura/escritura de sales para usuarios autenticados
    match /sales/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Permitir lectura/escritura de metas para usuarios autenticados
    match /metas/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Verificar Dominios Autorizados
Firebase Console > Authentication > Settings:

```
Dominios autorizados:
- localhost:8000
- tu-dominio.com
- tu-dominio.web.app
```

### 4. Crear Usuarios de Prueba
En Firebase Console > Authentication:
1. Clic en "Agregar usuario"
2. Email: `agente@test.com`
3. Contraseña: `Test123!`
4. Clic en "Crear usuario"

### 5. Probar Acceso
```
URL: https://tu-dominio.com/index.html
Email: agente@test.com
Contraseña: Test123!
```

---

## 🔒 SEGURIDAD IMPORTANTE

### ⚠️ CAMBIAR CONFIGURACIÓN ANTES DE PRODUCCIÓN

1. **Firebase:** Usa tu propio proyecto
2. **Dominio:** Configura tu dominio personalizado
3. **SSL:** Habilita HTTPS obligatorio
4. **Reglas Firestore:** Restringe acceso apropiadamente
5. **Respaldo:** Configura respaldos automáticos

---

## 📊 OPTIMIZATION POST-DESPLIEGUE

### Habilitar Caché
```javascript
// En el navegador
if ('caches' in window) {
  caches.open('crm-cache-v1').then(cache => {
    cache.addAll([
      '/index.html',
      '/admin.html',
      '/generador-ofertas.html'
    ]);
  });
}
```

### Minificar Código
```bash
# Instalar minificador
npm install -g terser uglify-css

# Minificar HTML (no necesario en este caso)
# Minificar CSS/JS
```

### Monitoreo
Firebase proporciona analíticas automáticas:
```
Firebase Console > Analytics
```

---

## 🧪 TESTING POST-DESPLIEGUE

### Checklist de Verificación
- [ ] Login funciona (Google y Email)
- [ ] Crear nuevo lead
- [ ] Editar lead
- [ ] Mover lead en pipeline (Drag & drop)
- [ ] Generar oferta
- [ ] Exportar Excel
- [ ] Ver Analytics
- [ ] Admin panel carga
- [ ] Datos persisten en Firebase
- [ ] Responsive en móvil

### Pruebas de Carga
```bash
# Con Apache Bench
ab -n 100 -c 10 https://tu-dominio.com/

# Con wrk
wrk -t4 -c100 -d30s https://tu-dominio.com/
```

---

## 🐛 TROUBLESHOOTING

### "Error: 404 Not Found"
**Solución:**
```bash
# Verificar que .htaccess o nginx.conf está bien configurado
# Asegurarse que los archivos HTML están en el directorio correcto
```

### "Firebase no conecta"
**Solución:**
```javascript
// En console del navegador (F12)
firebase
// Debe mostrar objeto Firebase

// Verificar credenciales en firebaseConfig
```

### "No puedo iniciar sesión"
**Solución:**
1. Verificar dominio en Firebase Console > Authentication
2. Limpiar cookies y cache
3. Intentar con Google Sign-In
4. Verificar que el usuario existe en Firebase

### "Los datos no se guardan"
**Solución:**
1. Verificar reglas de Firestore
2. Verificar que Firebase está inicializado
3. Abrir Developer Tools > Network para ver errores
4. Verificar permisos de usuario en Firebase

### "Lento en acceso"
**Solución:**
1. Habilitar gzip en servidor
2. Habilitar CDN
3. Usar Firebase Hosting (más rápido)
4. Minificar archivos CSS/JS

---

## 📈 MONITOREO CONTINUO

### Alertas Recomendadas
```
1. Alertar si más de 10 usuarios activos simultáneamente
2. Alertar si comisiones > $10,000 al día
3. Alertar si leads sin respuesta > 7 días
```

### Backups
```bash
# Firebase hace backups automáticos
# Pero es buena práctica exportar datos semanalmente

# Descargar datos de Firestore
firebase firestore:export gs://tu-bucket/backups/
```

---

## 🎉 ¡COMPLETADO!

Tu CRM está listo. Próximos pasos:

1. ✅ Crear usuarios en Firebase
2. ✅ Entrenar al equipo
3. ✅ Configurar metas iniciales
4. ✅ Monitorear desempeño
5. ✅ Optimizar según métricas

---

## 📞 SOPORTE RÁPIDO

**Firebase Support:** https://firebase.google.com/support
**Issues en Chrome:** F12 > Console
**Check Status:** https://status.firebase.google.com

---

*Guía de despliegue - CRM Ventas Pro v2.0*
