import dagster as dg
from dagster_duckdb import DuckDBResource
from .assets.xkeleton import xkeleton, xkeleton_job, xkeleton_schedule

defs = dg.Definitions(
    assets=[xkeleton],
    jobs=[xkeleton_job],
    schedules=[xkeleton_schedule],
    resources={"duckdb": DuckDBResource(database=":memory:")}
)
