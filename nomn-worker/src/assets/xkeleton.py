import dagster as dg
from dagster_duckdb import DuckDBResource

@dg.asset(compute_kind="duckdb")
def xkeleton(duckdb: DuckDBResource):
    c = duckdb.connect(":memory:")
    print(c.sql("select 123").show())

xkeleton_job = dg.define_asset_job("xkeleton_job", selection=["xkeleton"])
xkeleton_schedule = dg.ScheduleDefinition(job=xkeleton_job,cron_schedule="* * * * *")

@dg.schedule(job=xkeleton_job, cron_schedule="* * * * *")
def xkeleton_schd_annotation():
    return
