#!/bin/bash

# Paths
HOMEPAGE="template/index.html"
FOLDERS=("template/articulos" "template/nosotros" "template/servicios")

# Extract first header and footer to temp files
awk '/<header/{flag=1; count++} flag && count==1; /<\/header>/{flag=0}' "$HOMEPAGE" > /tmp/new_header.html
awk '/<footer/{flag=1; count++} flag && count==1; /<\/footer>/{flag=0}' "$HOMEPAGE" > /tmp/new_footer.html

# Fix anchor links in header and footer
sed 's/href="#/href="index.html#/g' /tmp/new_header.html > /tmp/new_header_fixed.html
sed 's/href="#/href="index.html#/g' /tmp/new_footer.html > /tmp/new_footer_fixed.html

# Fix image paths in header and footer
sed 's/src="\([^"]*\)"/src="..\/\1"/g' /tmp/new_header_fixed.html > /tmp/new_header_final.html
sed 's/src="\([^"]*\)"/src="..\/\1"/g' /tmp/new_footer_fixed.html > /tmp/new_footer_final.html

# Function to update a single file
update_file() {
  local file="$1"
  
  # Remove existing header
  awk 'BEGIN{h=0} /<header/{h=1} !h; /<\/header>/{h=0}' "$file" > "$file.tmp"
  
  # Insert new header after body tag
  awk '/<body>/{print; system("cat /tmp/new_header_final.html"); next} 1' "$file.tmp" > "$file.tmp2"
  
  # Remove existing footer
  awk 'BEGIN{f=0} /<footer/{f=1} !f; /<\/footer>/{f=0}' "$file.tmp2" > "$file.tmp3"
  
  # Insert new footer before closing body tag
  awk '/<\/body>/{system("cat /tmp/new_footer_final.html"); print; next} 1' "$file.tmp3" > "$file"
  
  rm "$file.tmp" "$file.tmp2" "$file.tmp3"
}

# Loop through all html files in the folders
for folder in "${FOLDERS[@]}"; do
  for file in "$folder"/*.html; do
    echo "Updating $file"
    update_file "$file"
  done
done

echo "All files updated!" 