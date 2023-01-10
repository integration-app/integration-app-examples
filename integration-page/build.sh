#!/bin/bash

folder1=$1
folder2=$2
folder3=$3

# Create folder3 if it does not exist
if [ ! -d "$folder3" ]; then
    mkdir "$folder3"
fi

# loop through the subfolders in the first folder
for subfolder1 in "$folder1"/*/; do
  # get the subfolder name without the path
  subfolder1_name="$(basename "$subfolder1")"

  # loop through the subfolders in the second folder
  for subfolder2 in "$folder2"/*/; do
    # get the subfolder name without the path
    subfolder2_name="$(basename "$subfolder2")"

    # create a new subfolder in folder3 with the pair's name
    new_subfolder="$folder3/${subfolder1_name}_${subfolder2_name}"
    mkdir "$new_subfolder"

    # copy the subfolders from folder1 and folder2 to new_subfolder
    cp -R "$subfolder1" "$new_subfolder"
    cp -R "$subfolder2" "$new_subfolder"
  done
done
