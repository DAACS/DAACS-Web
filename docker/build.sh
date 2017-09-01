#! /bin/bash -e

rm -rf build
mkdir build
mkdir build/daacs
cp -r ../daacs/dist build/daacs/
rm -rf ../node/node_modules
cp -r ../node build/
