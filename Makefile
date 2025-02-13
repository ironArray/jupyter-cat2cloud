.PHONY: init install

PYTHON = python3
BIN = ./venv/bin

install:
	${PYTHON} -m venv venv
	${BIN}/pip install -U pip
	${BIN}/pip install jupyterlab notebook
	${BIN}/pip install -ve .
	${BIN}/jupyter labextension develop --overwrite .

init:
	${PYTHON} -m venv venv
	${BIN}/pip install -U pip
	${BIN}/pip install copier jinja2-time jupyterlab
	# Tests: No (Yes does not work)
	${BIN}/copier copy --trust https://github.com/jupyterlab/extension-template .
