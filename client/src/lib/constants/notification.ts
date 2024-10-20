// NOTE: cannot import const variables exported from client components into server components
// this is how we can import const variables to both client and server components
export const NOTIFICATIONS_LIMIT = 5 as const
export const CURSOR_INITIAL_STATE = 'cursor.initial.state' as const
