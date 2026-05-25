# Analisis 1 - Login

Fecha: 2026-05-25

## Resumen
El frontend tiene formulario y store de login, pero el flujo no esta integrado en la app: no hay router, el componente no se renderiza y no existe la ruta /dashboard. Ademas, hay diferencias entre el contrato del backend y lo que espera el frontend (ruta y forma de respuesta), y falta el manejo de cookies para refresh token. Esto impide que el login funcione de punta a punta.

## Estado actual (frontend)
- Formulario en Login con email y password, llama a useAuthStore.login y luego navega a /dashboard.
- El store usa fetch a `${VITE_API_URL}/auth/login`, espera `{ user, token }` y persiste user y token en localStorage con zustand persist.
- App solo renderiza un Hello world y no hay rutas definidas.
- main no tiene BrowserRouter, por lo que useNavigate no funciona si Login se monta.

## Contrato actual (backend)
- Ruta real: `POST /api/auth/login` (app monta `/api/auth` y el router usa `/login`).
- Respuesta estandarizada: `{ status, message, data: { user, token } }`.
- Setea cookie httpOnly `refreshToken` en login.

## Errores y diferencias detectadas (prioridad)
1. Alta - Posible mismatch de endpoint: frontend usa `/auth/login` mientras el backend expone `/api/auth/login`. Si `VITE_API_URL` no incluye `/api`, la ruta falla.
2. Alta - Forma de respuesta distinta: el frontend espera `{ user, token }`, pero el backend envuelve en `data`. Resultado: `user` y `token` quedan undefined.
3. Alta - No hay router ni rutas: Login no se renderiza y `useNavigate` falla sin proveedor de router. Tampoco existe `/dashboard`.
4. Media - No se envian credenciales: falta `credentials: "include"` en fetch para aceptar la cookie `refreshToken`.
5. Media - Tipos inconsistentes: el backend retorna `role` y el store define `User` sin `role` (y existe un tipo `UserData` en tipos). Esto puede romper tipado y UI dependiente de roles.
6. Baja - UX basica: no hay validacion de campos vacios, ni limpieza de error al escribir, ni etiquetas accesibles.
7. Baja - `isLoading` se setea dos veces (no rompe, pero es redundante).

## Faltantes para completar el login
- Montar router y definir rutas publicas y privadas (al menos Login y Dashboard).
- Renderizar el Login en la app (ruta o pagina principal).
- Ajustar el parsing del response del login para leer `data.user` y `data.token`.
- Definir estrategia de tokens (ver seguridad) y usar refresh-token cuando expire el access token.
- Conectar logout y refresh token a endpoints del backend.
- Implementar guard o proteccion de rutas para recursos protegidos.

## UX - Mejoras recomendadas
- Validar email/password en cliente y deshabilitar submit si estan vacios.
- Mostrar mensajes de error claros y limpiar error al cambiar input.
- Agregar labels, `autoComplete` y estados de foco para accesibilidad.
- Mostrar feedback visual consistente (loading, error, exito).

## Seguridad - Riesgos y mejoras
- Guardar access token en localStorage expone a XSS. Mejor: token en memoria y usar refresh token via cookie httpOnly (ya implementado en backend).
- Si se usa cookie, habilitar `credentials: "include"` y configurar CORS para `credentials: true`.
- Definir expiracion y renovacion de token (refresh) y manejar logout real.

## Recomendaciones inmediatas (sin codigo)
- Confirmar el valor real de `VITE_API_URL` y si incluye `/api`.
- Confirmar el contrato del login: usar `data.user` y `data.token`.
- Definir el flujo de rutas (Login publico, Dashboard protegido).
- Decidir estrategia de tokens y refresh antes de seguir con endpoints protegidos.

## Checklist priorizada
- [ ] P0: Montar router y rutas (Login publico y Dashboard privado) y renderizar Login.
- [ ] P0: Ajustar endpoint para que apunte a `/api/auth/login` (o corregir `VITE_API_URL`).
- [ ] P0: Parsear la respuesta desde `data.user` y `data.token`.
- [ ] P1: Enviar `credentials: "include"` para recibir la cookie `refreshToken`.
- [ ] P1: Unificar tipos de usuario (incluir `role`) para evitar desalineaciones.
- [ ] P2: Validaciones de formulario y mejoras de accesibilidad (labels, autoComplete).
- [ ] P2: Limpiar error al escribir y evitar doble set de `isLoading`.

## Referencias
- Backend repo: https://github.com/CristianLopezGonzalez/Libreria
