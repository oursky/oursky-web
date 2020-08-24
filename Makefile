.PHONY: deploy-production
deploy-production: build deploy invalidate

.PHONY: build
build:
	yarn install
	yarn run build

.PHONY: deploy
deploy:
	aws s3 sync dist s3://$(S3_BUCKET_NAME) --delete

.PHONY: invalidate
invalidate:
	aws cloudfront create-invalidation --distribution-id $(CDN_DISTRIBUTION_ID) --paths $(CDN_INVALIDATION_PATH)
