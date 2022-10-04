class ACL {
  constructor() {
    throw new Error(
      'ACL não pode ser instanciada. Utilize os métodos estáticos.',
    );
  }

  static checaACL(perfis, lista) {
    let perfilUser = perfis;
    let perfilTransacao = ACL._getACL(lista);
    let acl = false;
    perfilUser.forEach((perfilU) => {
      perfilTransacao.forEach((perfilT) => {
        if (perfilT == perfilU) {
          acl = true;
        }
      });
    });
    return acl;
  }

  static _getACL(ACL) {
    const acl = {
      admin: ['admin'],
      julgamento: ['admin', 'julgamento'],
      pessoal: ['admin', 'pessoal'],
      qualidade: ['admin', 'qualidade'],
      conselheiro: ['admin', 'conselheiro', 'julgamento'],
      carf: ['admin', 'carf'],
      gestor: ['admin', 'gestor'],
      serpro: ['admin', 'serpro'],
      teste: ['admin', 'teste'],
      suporte: ['admin', 'suporte'],
      premio: ['admin', 'premio'],
      presidente: ['admin', 'presidente'],
    };
    return acl[ACL];
  }
}
module.exports = ACL;
