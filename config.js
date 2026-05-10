/**
 * 🔧 CONFIGURACIÓN CENTRAL - CRM VENTAS PRO
 * 
 * Este archivo puede ser importado en todos los módulos
 * para mantener consistencia en parámetros y estilos.
 * 
 * ⚠️ NO OLVIDES: Cambiar estas configuraciones según tus necesidades
 */

// ============================================
// 🔐 CONFIGURACIÓN FIREBASE
// ============================================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAAETou6DhYIJJ8cxI13BU1p_l3yGPMilA",
  authDomain: "ventas-ebd49.firebaseapp.com",
  projectId: "ventas-ebd49",
  storageBucket: "ventas-ebd49.firebasestorage.app",
  messagingSenderId: "907042495792",
  appId: "1:907042495792:web:6827da0b73333496f6bcf5"
};

// ============================================
// 💰 CONFIGURACIÓN DE COMISIONES
// ============================================
const COMMISSION_CONFIG = {
  'Dispersado': 0.02,      // 2% del monto dispersado
  'Acepta oferta': 0.005,  // 0.5% del monto preaprobado
  'Long track': 0.0025     // 0.25% por seguimiento
};

// ============================================
// 🎯 PLANTILLAS DE OFERTAS
// ============================================
const OFFER_TEMPLATES = {
  'financiero': {
    name: 'Crédito Financiero',
    description: 'Oferta estándar para crédito personal',
    icon: 'fa-credit-card',
    color: 'from-blue-500 to-blue-600',
    fields: {
      tasa: 15.5,        // Tasa anual
      plazo: 36,         // Plazo en meses
      comisision: 1.5    // Comisión en %
    }
  },
  'hipotecario': {
    name: 'Hipotecario',
    description: 'Para adquisición de inmuebles',
    icon: 'fa-home',
    color: 'from-green-500 to-green-600',
    fields: {
      tasa: 7.2,
      plazo: 240,
      comisision: 0.5
    }
  },
  'automotriz': {
    name: 'Automotriz',
    description: 'Financiamiento de vehículos',
    icon: 'fa-car',
    color: 'from-red-500 to-red-600',
    fields: {
      tasa: 9.8,
      plazo: 60,
      comisision: 1.0
    }
  },
  'express': {
    name: 'Express',
    description: 'Crédito rápido y simple',
    icon: 'fa-bolt',
    color: 'from-purple-500 to-purple-600',
    fields: {
      tasa: 22,
      plazo: 12,
      comisision: 2.5
    }
  }
};

// ============================================
// 📊 PIPELINE STATUSES
// ============================================
const PIPELINE_STATUSES = [
  "Con oferta",
  "Acepta oferta",
  "Long track",
  "Dispersado",
  "Rechazado",
  "Cancelado",
  "Expirado"
];

// ============================================
// ❌ RAZONES DE PÉRDIDA
// ============================================
const LOST_REASONS = [
  "No contesta / Inlocalizable",
  "Oferta expirada",
  "Tasa/Condiciones no favorables",
  "Se fue con la competencia",
  "No cumple requisitos / Buro",
  "Cliente se arrepintió",
  "Otro motivo"
];

// ============================================
// 🎨 CONFIGURACIÓN DE COLORES
// ============================================
const COLOR_SCHEME = {
  primary: '#3b82f6',      // Azul
  success: '#10b981',      // Verde
  danger: '#ef4444',       // Rojo
  warning: '#f59e0b',      // Amarillo
  info: '#06b6d4',         // Cyan
  purple: '#a855f7',       // Púrpura
  
  status: {
    'Dispersado': '#10b981',      // Verde
    'Acepta oferta': '#3b82f6',   // Azul
    'Long track': '#f59e0b',      // Amarillo
    'Con oferta': '#6366f1',      // Índigo
    'Rechazado': '#ef4444',       // Rojo
    'Cancelado': '#6b7280',       // Gris
    'Expirado': '#a3a3a3'         // Gris claro
  }
};

// ============================================
// 📱 CONFIGURACIÓN DE INTERFAZ
// ============================================
const UI_CONFIG = {
  // Cantidad de registros en auditoría
  auditLogMaxSize: 50,
  
  // Días de caducidad de oferta
  offerExpiryDays: 30,
  
  // Umbral de alerta para leads sin respuesta
  noResponseAlertDays: 7,
  
  // Mostrar animaciones
  enableAnimations: true,
  
  // Modo oscuro (implementar después)
  darkMode: false
};

// ============================================
// 🌍 CONFIGURACIÓN DE LOCALIZACIÓN
// ============================================
const LOCALE_CONFIG = {
  locale: 'es-MX',
  currency: 'MXN',
  timeZone: 'America/Mexico_City',
  
  // Formatos de fecha
  dateFormats: {
    short: { day: '2-digit', month: 'short' },
    medium: { day: '2-digit', month: '2-digit', year: 'numeric' },
    long: { day: '2-digit', month: 'long', year: 'numeric' },
    time: { hour:'2-digit', minute:'2-digit' },
    full: { day: '2-digit', month: '2-digit', year: 'numeric', hour:'2-digit', minute:'2-digit' }
  }
};

// ============================================
// 🔐 CONFIGURACIÓN DE PERMISOS
// ============================================
const PERMISSIONS = {
  // Roles disponibles
  roles: {
    'agent': ['create', 'read', 'update', 'delete_own'],
    'supervisor': ['create', 'read', 'update', 'delete_own', 'read_all', 'export'],
    'admin': ['create', 'read', 'update', 'delete', 'read_all', 'export', 'configure']
  },
  
  // Campos visibles por rol
  visibleFields: {
    'agent': ['folio', 'cliente', 'monto', 'estatus', 'comision'],
    'supervisor': ['folio', 'cliente', 'agente', 'monto', 'dispersado', 'estatus', 'comision'],
    'admin': ['folio', 'cliente', 'agente', 'monto', 'dispersado', 'estatus', 'comision', 'email', 'fecha', 'acciones']
  }
};

// ============================================
// 📧 CONFIGURACIÓN DE NOTIFICACIONES
// ============================================
const NOTIFICATION_CONFIG = {
  // Alertas automáticas
  alerts: {
    leadWithoutResponse: {
      enabled: true,
      daysThreshold: 7,
      priority: 'warning'
    },
    highCommission: {
      enabled: true,
      threshold: 500, // MXN
      priority: 'success'
    },
    conversionMilestone: {
      enabled: true,
      percentage: [25, 50, 75, 100],
      priority: 'info'
    }
  }
};

// ============================================
// 🔧 FUNCIONES AUXILIARES COMPARTIDAS
// ============================================

/**
 * Formatea un número como moneda
 */
function formatMoney(value, currency = LOCALE_CONFIG.currency) {
  return new Intl.NumberFormat(LOCALE_CONFIG.locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(value || 0);
}

/**
 * Formatea una fecha según el formato especificado
 */
function formatDate(date, format = 'short') {
  const d = date.toDate ? date.toDate() : new Date(date);
  return new Intl.DateTimeFormat(LOCALE_CONFIG.locale, LOCALE_CONFIG.dateFormats[format]).format(d);
}

/**
 * Calcula la quincena del mes
 */
function getQuincena(date) {
  return date.getDate() <= 15 ? 1 : 2;
}

/**
 * Calcula comisión basada en estatus
 */
function calculateCommission(sale) {
  const rate = COMMISSION_CONFIG[sale.estatus] || 0;
  const baseAmount = sale.monto_dispersado || sale.monto_preaprobado || 0;
  return baseAmount * rate;
}

/**
 * Extrae nombre de agente del email
 */
function getAgentName(email) {
  return email ? email.split('@')[0] : 'Sin asignar';
}

/**
 * Genera ID único
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ============================================
// 📊 CONFIGURACIÓN DE EXPORTACIÓN
// ============================================
const EXPORT_CONFIG = {
  // Formato predeterminado
  defaultFormat: 'xlsx',
  
  // Campos a exportar
  fields: {
    xlsx: ['folio', 'nombre_cliente', 'monto_preaprobado', 'monto_dispersado', 'estatus', 'comision', 'fecha'],
    csv: ['folio', 'nombre_cliente', 'monto_preaprobado', 'monto_dispersado', 'estatus', 'comision', 'fecha'],
    pdf: ['folio', 'nombre_cliente', 'monto_preaprobado', 'monto_dispersado', 'estatus', 'comision', 'fecha']
  },
  
  // Nombre del archivo
  filename: (type) => `CRM_Export_${new Date().toISOString().split('T')[0]}.${type}`
};

// ============================================
// ✅ EXPORTAR PARA USO
// ============================================

// Nota: Si usas módulos ES6:
// export { FIREBASE_CONFIG, COMMISSION_CONFIG, ... }

// Para scripts inline en HTML, estos están disponibles globalmente
console.log('✅ Configuración CRM cargada correctamente');
