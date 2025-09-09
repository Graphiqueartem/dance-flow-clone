-- Update performances table to support payment status
ALTER TABLE public.performances ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- Update orders table to link to performances
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS performance_id UUID REFERENCES public.performances(id);

-- Update status values to include payment-related statuses
UPDATE public.performances SET status = 'pending' WHERE status IS NULL;