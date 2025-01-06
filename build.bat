@echo off 

ng build --base-href "/portfolio" --output-path docs

ng deploy  --build-target=test:build:production --message="What could possibly go wrong?" --base-href="/portfolio" --repo="https://github.com/mimanshu-maheshwari/portfolio"