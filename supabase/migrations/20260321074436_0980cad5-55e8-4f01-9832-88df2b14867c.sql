
CREATE OR REPLACE FUNCTION public.validate_invite_code(_code text)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT jsonb_build_object('valid', true, 'group_code', COALESCE(group_code, invite_code))
     FROM public.profiles
     WHERE invite_code = upper(_code)
     LIMIT 1),
    jsonb_build_object('valid', false)
  );
$$;
