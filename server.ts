import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

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
    estado_cuenta TEXT DEFAULT 'activa'
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
`);

// Seed data
const seed = db.prepare("SELECT COUNT(*) as count FROM trabajos").get() as { count: number };
if (seed.count === 0) {
  db.exec(`
    INSERT INTO users (id, nombre, apellidos, email, tipo_usuario, ciudad) VALUES 
    ('u1', 'Juan', 'Pérez', 'juan@example.com', 'cliente', 'Madrid'),
    ('u2', 'María', 'García', 'maria@example.com', 'trabajador', 'Madrid');

    INSERT INTO trabajos (id, cliente_id, titulo, descripcion, categoria, precio, urgente, direccion) VALUES 
    ('t1', 'u1', 'Montaje de armario IKEA', 'Necesito montar un armario Pax de 3 cuerpos. Tengo las herramientas.', 'montaje', 60, 1, 'Calle Mayor, 1, Madrid'),
    ('t2', 'u1', 'Limpieza de cristales', 'Limpieza de 4 ventanas grandes en piso céntrico.', 'limpieza', 40, 0, 'Paseo de la Castellana, 10, Madrid'),
    ('t3', 'u1', 'Pintar habitación pequeña', 'Pintar una habitación de 10m2. Ya tengo la pintura.', 'pintura', 80, 1, 'Calle de Alcalá, 50, Madrid');
  `);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get all jobs
  app.get("/api/jobs", (req, res) => {
    const jobs = db.prepare("SELECT * FROM trabajos WHERE estado = 'publicado' ORDER BY fecha_publicacion DESC").all();
    res.json(jobs);
  });

  // Create a job
  app.post("/api/jobs", (req, res) => {
    const { id, cliente_id, titulo, descripcion, categoria, precio, latitud, longitud, direccion, urgente } = req.body;
    const stmt = db.prepare(`
      INSERT INTO trabajos (id, cliente_id, titulo, descripcion, categoria, precio, latitud, longitud, direccion, urgente)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, cliente_id, titulo, descripcion, categoria, precio, latitud, longitud, direccion, urgente ? 1 : 0);
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
