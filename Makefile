S3_BUCKET_NAME = oursky.com

.PHONY: deploy-production
deploy-production:
	yarn install
	yarn run build
	aws s3 sync --content-type "text/html" dist s3://$(S3_BUCKET_NAME) --delete
	aws cloudfront create-invalidation --distribution-id $(CDN_DISTRIBUTION_ID) --paths "/*"
