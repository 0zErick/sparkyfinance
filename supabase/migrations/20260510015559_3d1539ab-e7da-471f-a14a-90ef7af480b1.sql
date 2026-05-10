
-- Fix 1: Restrict get_user_group_code to current user only (prevents enumeration)
CREATE OR REPLACE FUNCTION public.get_user_group_code(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  -- Ignore _user_id parameter; only ever return the caller's own group_code
  SELECT group_code FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$function$;

-- Fix 2: Add RLS authorization on realtime.messages so authenticated users
-- can only subscribe to channel topics scoped to themselves or their group.
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can subscribe to own topics" ON realtime.messages;
CREATE POLICY "Authenticated users can subscribe to own topics"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  realtime.topic() = ('profile-' || auth.uid()::text)
  OR realtime.topic() = ('group-members-' || auth.uid()::text)
  OR realtime.topic() = ('group-members-' || COALESCE(public.get_user_group_code(auth.uid()), ''))
  OR realtime.topic() = 'transactions-realtime-query'
);

DROP POLICY IF EXISTS "Authenticated users can send to own topics" ON realtime.messages;
CREATE POLICY "Authenticated users can send to own topics"
ON realtime.messages
FOR INSERT
TO authenticated
WITH CHECK (
  realtime.topic() = ('profile-' || auth.uid()::text)
  OR realtime.topic() = ('group-members-' || auth.uid()::text)
  OR realtime.topic() = ('group-members-' || COALESCE(public.get_user_group_code(auth.uid()), ''))
  OR realtime.topic() = 'transactions-realtime-query'
);
