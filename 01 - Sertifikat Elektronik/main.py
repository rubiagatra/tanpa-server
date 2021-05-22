import os
from datetime import datetime

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

from jinja2 import FileSystemLoader, Environment
from weasyprint import HTML


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/certificate')
def create_certificate(name: str):
    template_loader = FileSystemLoader('./')
    template_env = Environment(loader=template_loader)
    template = template_env.get_template('certificate.html')
    rendered_html = template.render({"name": name, "date": datetime.now().strftime('%d/%m/%Y')})

    return Response(content=HTML(string=rendered_html, base_url=os.getcwd())
                    .write_pdf(None, stylesheets=['certificate.css']), media_type='application/pdf')
