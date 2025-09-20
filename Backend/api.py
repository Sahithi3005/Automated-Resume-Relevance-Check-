@router.get("/job_descriptions")
async def list_jds():
    db: Session = next(get_db())
    jds = db.query(models.JobDescription).order_by(models.JobDescription.created_at.desc()).limit(100).all()
    out = []
    for j in jds:
        out.append({"id": j.id, "title": j.title, "location": j.location, "created_at": j.created_at.isoformat()})
    return out
