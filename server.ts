import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import crypto from "crypto";
import cookieParser from "cookie-parser";

const db = new Database("prontojob.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    nombre TEXT,
    apellidos TEXT,
    email TEXT UNIQUE,
    telefono TEXT,
    tipo_usuario TEXT,
    foto_perfil TEXT,
    ciudad TEXT,
    direccion_base TEXT,
    latitud REAL,
    longitud REAL,
    verificado_identidad INTEGER DEFAULT 0,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado_cuenta TEXT DEFAULT 'activa',
    descripcion_profesional TEXT,
    categorias TEXT, -- JSON array
    radio_trabajo_km INTEGER DEFAULT 10,
    disponibilidad TEXT DEFAULT 'total',
    valoracion_media REAL DEFAULT 0,
    total_trabajos_completados INTEGER DEFAULT 0,
    tasa_cancelacion REAL DEFAULT 0,
    tiempo_respuesta_medio TEXT,
    badge_verificado INTEGER DEFAULT 0,
    badge_premium INTEGER DEFAULT 0,
    -- New fields
    birth_date TEXT,
    address TEXT,
    postal_code TEXT,
    password_hash TEXT,
    verification_status TEXT DEFAULT 'PENDING', -- PENDING | VERIFIED | REJECTED
    dni_number TEXT,
    dni_front_url TEXT,
    dni_back_url TEXT,
    is_pro INTEGER DEFAULT 0,
    is_boosted INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS consents (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    consent_type TEXT, -- TERMS, COMMISSION_15
    accepted INTEGER DEFAULT 1,
    version TEXT DEFAULT 'v1.0',
    accepted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip TEXT,
    user_agent TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS trabajos (
    id TEXT PRIMARY KEY,
    cliente_id TEXT,
    trabajador_id TEXT,
    titulo TEXT,
    descripcion TEXT,
    categoria TEXT,
    precio REAL,
    urgente INTEGER DEFAULT 0,
    destacado INTEGER DEFAULT 0,
    latitud REAL,
    longitud REAL,
    direccion TEXT,
    ciudad TEXT,
    estado TEXT DEFAULT 'publicado',
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_aceptacion DATETIME,
    fecha_finalizacion DATETIME,
    FOREIGN KEY(cliente_id) REFERENCES users(id),
    FOREIGN KEY(trabajador_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS solicitudes (
    id TEXT PRIMARY KEY,
    trabajo_id TEXT,
    trabajador_id TEXT,
    mensaje_predefinido TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado TEXT DEFAULT 'pendiente',
    FOREIGN KEY(trabajo_id) REFERENCES trabajos(id),
    FOREIGN KEY(trabajador_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS wallets (
    id TEXT PRIMARY KEY,
    usuario_id TEXT UNIQUE,
    saldo_disponible REAL DEFAULT 0,
    saldo_retenido REAL DEFAULT 0,
    total_ganado REAL DEFAULT 0,
    total_retirado REAL DEFAULT 0,
    FOREIGN KEY(usuario_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS extras_trabajo (
    id TEXT PRIMARY KEY,
    trabajo_id TEXT NOT NULL,
    tipo TEXT NOT NULL, -- 'DESTACADO', 'URGENTE'
    precio REAL NOT NULL,
    fecha_inicio TEXT NOT NULL,
    fecha_fin TEXT NOT NULL,
    estado TEXT DEFAULT 'activo',
    FOREIGN KEY(trabajo_id) REFERENCES trabajos(id)
  );

  CREATE TABLE IF NOT EXISTS perfil_boost (
    id TEXT PRIMARY KEY,
    trabajador_id TEXT NOT NULL,
    fecha_inicio TEXT NOT NULL,
    fecha_fin TEXT NOT NULL,
    estado TEXT DEFAULT 'activo',
    FOREIGN KEY(trabajador_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS perfil_pro (
    id TEXT PRIMARY KEY,
    trabajador_id TEXT NOT NULL,
    activo INTEGER DEFAULT 1,
    fecha_activacion TEXT NOT NULL,
    fecha_expiracion TEXT,
    FOREIGN KEY(trabajador_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS planes (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    precio_mensual REAL NOT NULL,
    activo INTEGER DEFAULT 1,
    descripcion TEXT -- JSON array
  );

  CREATE TABLE IF NOT EXISTS suscripciones (
    id TEXT PRIMARY KEY,
    usuario_id TEXT NOT NULL,
    plan_id TEXT NOT NULL,
    estado TEXT DEFAULT 'activa', -- activa | cancelada | impago
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_fin DATETIME,
    stripe_subscription_id TEXT,
    FOREIGN KEY(usuario_id) REFERENCES users(id),
    FOREIGN KEY(plan_id) REFERENCES planes(id)
  );

  CREATE TABLE IF NOT EXISTS promociones (
    id TEXT PRIMARY KEY,
    codigo TEXT UNIQUE NOT NULL,
    descuento_porcentaje REAL,
    descuento_monto REAL,
    fecha_inicio DATETIME,
    fecha_fin DATETIME,
    activo INTEGER DEFAULT 1
  );
`);

  // Seed data update
const seed = db.prepare("SELECT COUNT(*) as count FROM trabajos").get() as { count: number };
if (seed.count === 0) {
  db.exec(`
    INSERT INTO users (id, nombre, apellidos, email, tipo_usuario, ciudad, descripcion_profesional, categorias, verificado_identidad, valoracion_media, total_trabajos_completados, badge_premium, verification_status, password_hash) VALUES 
    ('u1', 'Juan', 'Pérez', 'juan@example.com', 'cliente', 'Madrid', 'Busco ayuda puntual para mi hogar y pequeñas reparaciones.', '[]', 1, 4.8, 12, 0, 'VERIFIED', 'ef92b778bafe771e89245b89ecdec08a447755a9e599e999d48183d676b6c54d'),
    ('u2', 'María', 'García', 'maria@example.com', 'trabajador', 'Madrid', 'Especialista en montaje de muebles y reparaciones del hogar con más de 5 años de experiencia.', '["montaje", "reparaciones", "pintura"]', 1, 4.9, 28, 1, 'VERIFIED', 'ef92b778bafe771e89245b89ecdec08a447755a9e599e999d48183d676b6c54d'),
    ('u3', 'Carlos', 'López', 'carlos@example.com', 'trabajador', 'Barcelona', 'Fontanero profesional disponible para urgencias 24/7.', '["fontaneria", "reparaciones"]', 1, 4.7, 45, 0, 'VERIFIED', 'ef92b778bafe771e89245b89ecdec08a447755a9e599e999d48183d676b6c54d');

    INSERT INTO trabajos (id, cliente_id, titulo, descripcion, categoria, precio, urgente, direccion, latitud, longitud, ciudad) VALUES 
    ('t1', 'u1', 'Montaje de armario IKEA', 'Necesito montar un armario Pax de 3 cuerpos. Tengo las herramientas y el manual.', 'montaje', 60, 1, 'Calle Mayor, 1, Madrid', 40.4168, -3.7038, 'Madrid'),
    ('t2', 'u1', 'Limpieza de cristales', 'Limpieza de 4 ventanas grandes en piso céntrico. Aporto productos de limpieza.', 'limpieza', 40, 0, 'Paseo de la Castellana, 10, Madrid', 40.4668, -3.6938, 'Madrid'),
    ('t3', 'u1', 'Pintar habitación pequeña', 'Pintar una habitación de 10m2. Ya tengo la pintura y rodillos.', 'pintura', 80, 1, 'Calle de Alcalá, 50, Madrid', 40.4268, -3.6838, 'Madrid'),
    ('t4', 'u1', 'Reparar grifo cocina', 'El grifo de la cocina gotea y necesita cambio de junta.', 'fontaneria', 30, 0, 'Calle de Serrano, 20, Madrid', 40.4368, -3.6738, 'Madrid'),
    // Vilassar Demo Area
    ('v1', 'u1', 'Jardinería Vilassar', 'Corte de césped y poda de setos.', 'jardineria', 45, 1, 'Carrer de Sant Joan, Vilassar de Mar', 41.5039, 2.3911, 'Vilassar de Mar'),
    ('v2', 'u1', 'Limpieza Vilassar', 'Limpieza a fondo de cocina.', 'limpieza', 30, 0, 'Avinguda de Carles III, Vilassar de Mar', 41.5059, 2.3951, 'Vilassar de Mar'),
    ('v3', 'u1', 'Montaje Muebles Vilassar', 'Montaje de cómoda y mesitas.', 'montaje', 55, 0, 'Carrer de Maria Vidal, Vilassar de Mar', 41.5019, 2.3871, 'Vilassar de Mar'),
    ('m1', 'u1', 'Pintura Mataró', 'Pintar salón de 20m2.', 'pintura', 120, 1, 'Riera de Mataró, Mataró', 41.5381, 2.4447, 'Mataró'),
    ('m2', 'u1', 'Reparación Persiana Mataró', 'Persiana atascada en balcón.', 'reparaciones', 40, 0, 'Carrer de Barcelona, Mataró', 41.5421, 2.4487, 'Mataró'),
    ('c1', 'u1', 'Limpieza Cabrera', 'Limpieza de cristales chalet.', 'limpieza', 35, 0, 'Carrer de la Riera, Cabrera de Mar', 41.5167, 2.3931, 'Cabrera de Mar'),
    ('p1', 'u1', 'Fontanería Premià', 'Cambio de grifo baño.', 'reparaciones', 65, 1, 'Gran Via de Lluís Companys, Premià de Mar', 41.4921, 2.3551, 'Premià de Mar'),
    ('v4', 'u1', 'Reparación Persiana Vilassar', 'Persiana atascada.', 'reparaciones', 40, 0, 'Carrer de Sant Jaume, Vilassar de Mar', 41.5045, 2.3935, 'Vilassar de Mar'),
    ('v5', 'u1', 'Pintura Salón Vilassar', 'Pintar salón 25m2.', 'pintura', 150, 0, 'Carrer de la Pau, Vilassar de Mar', 41.5025, 2.3895, 'Vilassar de Mar'),
    ('m3', 'u1', 'Mudanza Mataró', 'Traslado de cajas.', 'mudanzas', 80, 0, 'Carrer d''Enric Prat de la Riba, Mataró', 41.5401, 2.4467, 'Mataró'),
    ('m4', 'u1', 'Montaje IKEA Mataró', 'Montaje de estantería Kallax.', 'montaje', 35, 0, 'Carrer de Sant Isidor, Mataró', 41.5361, 2.4427, 'Mataró'),
    ('c2', 'u1', 'Jardín Cabrera', 'Poda de árboles frutales.', 'jardineria', 60, 1, 'Carrer de la Font, Cabrera de Mar', 41.5187, 2.3971, 'Cabrera de Mar'),
    ('p2', 'u1', 'Limpieza Premià', 'Limpieza de cristales local.', 'limpieza', 45, 0, 'Carrer de la Plaça, Premià de Mar', 41.4941, 2.3591, 'Premià de Mar'),
    ('v6', 'u1', 'Reparación Grifo Vilassar', 'Grifo cocina gotea.', 'fontaneria', 35, 1, 'Carrer de Sant Roc, Vilassar de Mar', 41.5065, 2.3975, 'Vilassar de Mar'),
    ('v7', 'u1', 'Limpieza Exprés Vilassar', 'Limpieza rápida 2h.', 'limpieza', 25, 1, 'Carrer de Sant Pere, Vilassar de Mar', 41.5015, 2.3855, 'Vilassar de Mar'),
    ('m5', 'u1', 'Pintura Habitación Mataró', 'Pintar habitación infantil.', 'pintura', 90, 0, 'Carrer de Sant Agustí, Mataró', 41.5441, 2.4507, 'Mataró')
  `);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/jobs/map", (req, res) => {
    const { swLat, swLng, neLat, neLng, zoom, category, urgent, featured, minPrice, maxPrice } = req.query;
    
    let query = "SELECT * FROM trabajos WHERE estado = 'publicado'";
    const params: any[] = [];

    if (swLat && neLat && swLng && neLng) {
      query += " AND latitud BETWEEN ? AND ? AND longitud BETWEEN ? AND ?";
      params.push(swLat, neLat, swLng, neLng);
    }

    if (category && category !== 'all' && category !== 'null') {
      query += " AND categoria = ?";
      params.push(category);
    }

    if (urgent === 'true') {
      query += " AND urgente = 1";
    }

    if (featured === 'true') {
      query += " AND destacado = 1";
    }

    if (minPrice) {
      query += " AND precio >= ?";
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      query += " AND precio <= ?";
      params.push(Number(maxPrice));
    }

    // Ordering: Featured first, then Urgent, then Recent
    query += " ORDER BY destacado DESC, urgente DESC, fecha_publicacion DESC";

    // Limit based on zoom (simulated)
    const zoomLevel = Number(zoom) || 13;
    let limit = 400;
    if (zoomLevel <= 11) limit = 100;
    else if (zoomLevel <= 13) limit = 200;
    
    query += " LIMIT ?";
    params.push(limit);

    const jobs = db.prepare(query).all(...params);
    res.json(jobs);
  });

  // Auth Helpers
  const hashPassword = (password: string) => {
    return crypto.createHash('sha256').update(password).digest('hex');
  };

  const sessions = new Map<string, string>(); // sessionId -> userId

  // Auth Routes
  app.post("/api/auth/register/step1", (req, res) => {
    const { nombre, apellidos, birth_date, address, postal_code, email, password, phone } = req.body;
    
    // Check if email exists
    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existing) {
      return res.status(400).json({ error: "El correo electrónico ya está registrado" });
    }

    const userId = `u${Date.now()}`;
    const password_hash = hashPassword(password);

    db.prepare(`
      INSERT INTO users (id, nombre, apellidos, birth_date, address, postal_code, email, password_hash, telefono, verification_status, tipo_usuario)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', 'cliente')
    `).run(userId, nombre, apellidos, birth_date, address, postal_code, email, password_hash, phone);

    const sessionId = crypto.randomBytes(16).toString('hex');
    sessions.set(sessionId, userId);
    res.cookie("sessionId", sessionId, { httpOnly: true, sameSite: 'none', secure: true });

    res.json({ success: true, userId });
  });

  app.post("/api/auth/register/step2", (req, res) => {
    const sessionId = req.cookies.sessionId;
    const userId = sessions.get(sessionId);
    if (!userId) return res.status(401).json({ error: "No autorizado" });

    const { dni_number, dni_front_url, dni_back_url } = req.body;

    db.prepare(`
      UPDATE users 
      SET dni_number = ?, dni_front_url = ?, dni_back_url = ?, verification_status = 'PENDING'
      WHERE id = ?
    `).run(dni_number, dni_front_url, dni_back_url, userId);

    res.json({ success: true });
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password, termsAccepted, commissionAccepted } = req.body;

    if (!termsAccepted || !commissionAccepted) {
      return res.status(400).json({ error: "Debes aceptar los términos y la comisión" });
    }

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (!user || user.password_hash !== hashPassword(password)) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Save consents
    const consentId1 = `c1_${Date.now()}`;
    db.prepare("INSERT INTO consents (id, user_id, consent_type, accepted, version) VALUES (?, ?, 'TERMS', 1, 'v1.0')")
      .run(consentId1, user.id);
    
    const consentId2 = `c2_${Date.now()}`;
    db.prepare("INSERT INTO consents (id, user_id, consent_type, accepted, version) VALUES (?, ?, 'COMMISSION_15', 1, 'v1.0')")
      .run(consentId2, user.id);

    const sessionId = crypto.randomBytes(16).toString('hex');
    sessions.set(sessionId, user.id);
    res.cookie("sessionId", sessionId, { httpOnly: true, sameSite: 'none', secure: true });

    res.json({ success: true, user });
  });

  app.post("/api/auth/logout", (req, res) => {
    const sessionId = req.cookies.sessionId;
    sessions.delete(sessionId);
    res.clearCookie("sessionId");
    res.json({ success: true });
  });

  app.get("/api/me", (req, res) => {
    const sessionId = req.cookies.sessionId;
    const userId = sessions.get(sessionId);
    if (!userId) return res.status(401).json({ error: "No autorizado" });

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    res.json(user);
  });

  // Get user profile
  app.get("/api/users/:id", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });

  // Update user profile
  app.post("/api/users/:id", (req, res) => {
    const { nombre, apellidos, ciudad, descripcion_profesional, categorias, radio_trabajo_km, disponibilidad } = req.body;
    const stmt = db.prepare(`
      UPDATE users 
      SET nombre = ?, apellidos = ?, ciudad = ?, descripcion_profesional = ?, categorias = ?, radio_trabajo_km = ?, disponibilidad = ?
      WHERE id = ?
    `);
    stmt.run(nombre, apellidos, ciudad, descripcion_profesional, JSON.stringify(categorias), radio_trabajo_km || 10, disponibilidad || 'total', req.params.id);
    res.json({ success: true });
  });

  // Get all jobs
  app.get("/api/jobs", (req, res) => {
    const jobs = db.prepare("SELECT * FROM trabajos WHERE estado = 'publicado' ORDER BY fecha_publicacion DESC").all();
    res.json(jobs);
  });

  // Create a job
  app.post("/api/jobs", (req, res) => {
    const sessionId = req.cookies.sessionId;
    const userId = sessions.get(sessionId);
    if (!userId) return res.status(401).json({ error: "No autorizado" });

    const user = db.prepare("SELECT verification_status FROM users WHERE id = ?").get(userId) as any;
    if (user.verification_status !== 'VERIFIED') {
      return res.status(403).json({ error: "Debes verificar tu identidad para publicar trabajos" });
    }

    const { id, cliente_id, titulo, descripcion, categoria, precio, latitud, longitud, direccion, urgente } = req.body;
    const stmt = db.prepare(`
      INSERT INTO trabajos (id, cliente_id, titulo, descripcion, categoria, precio, latitud, longitud, direccion, urgente)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, userId, titulo, descripcion, categoria, precio, latitud, longitud, direccion, urgente ? 1 : 0);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
