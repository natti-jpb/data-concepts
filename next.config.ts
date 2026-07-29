import type { NextConfig } from "next";

const basePath = "/data-concepts";

const nextConfig: NextConfig = {
  // servido em joaobonatti.com/data-concepts via rewrite no projeto do site.
  // basePath cobre assets, <Link> e router. A navegacao entre as 5 paginas usa
  // next/link e nao ha fetch absoluto nem location.origin, entao nada mais muda.
  basePath,
  // com basePath ativo a raiz passa a dar 404, quebrando quem tem o link antigo.
  // basePath: false impede o Next de prefixar o source, senao a regra viraria
  // /data-concepts -> /data-concepts e nunca casaria com a raiz.
  async redirects() {
    return [{ source: "/", destination: basePath, permanent: false, basePath: false }];
  },
};

export default nextConfig;
