S3_BUCKET_NAME = oursky.com

.PHONY: deploy-production
deploy-production:
	yarn install
	yarn run build
	aws s3 sync --delete --content-type "text/html" --exclude "assets/*" dist s3://$(S3_BUCKET_NAME)
	aws s3 sync dist/assets s3://$(S3_BUCKET_NAME)/assets
	aws cloudfront create-invalidation --distribution-id $(CDN_DISTRIBUTION_ID) --paths "/*"
