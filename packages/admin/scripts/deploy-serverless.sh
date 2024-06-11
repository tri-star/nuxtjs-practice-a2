BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd $BASE_DIR

pnpm build

serverless deploy --aws-profile $AWS_PROFILE --verbose
