def parse_int_or_fallback(int_str, fallback=0):
    v = fallback
    try:
        v = int(int_str)
    except Exception:
        pass
    return v
