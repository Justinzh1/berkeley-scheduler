#!/usr/bin/env bash

TERM_ABBRV='sp17'

RECOVER_DIR=recover
RECOVER_CLASSES_DIR=${RECOVER_DIR}/classes
RECOVER_INDICES_DIR=${RECOVER_DIR}/indices

OUTPUT_DEPARTMENTS_DIR=final
OUTPUT_CLASSES_DIR=${OUTPUT_DEPARTMENTS_DIR}/${TERM_ABBRV}/classes
OUTPUT_INDICES_DIR=${OUTPUT_DEPARTMENTS_DIR}/${TERM_ABBRV}/indices

cp ${RECOVER_CLASSES_DIR}/* ${OUTPUT_CLASSES_DIR}
cp ${RECOVER_INDICES_DIR}/* ${OUTPUT_INDICES_DIR}
