.PHONY: init

PYTHON = python3
BIN = ./venv/bin

init:
	${PYTHON} -m venv venv
	${BIN}/pip install -U pip
	${BIN}/pip install copier jinja2-time jupyterlab
	${BIN}/copier copy --trust https://github.com/jupyterlab/extension-template .
