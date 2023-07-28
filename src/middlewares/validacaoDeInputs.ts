async function verificarInputs(req, res, next) {
  const { nome, cep, sacasCafe, vencimentoPagamento } = req.body;

  const regexDate = /^\d{2}-\d{2}-\d{4}$/;

  const regexCEP = /^[0-9]{5}-[0-9]{3}$/;

  if (
    nome.length > 30 ||
    nome.length < 4 ||
    nome == null ||
    nome == undefined
  ) {
    return res.status(400).json({
      error:
        "Nome completo informado com tamanho errado ou não foi definido, entre 4 a 30 letras.",
    });
  } else if (typeof cep != "number" || cep.toString().split("").length != 8) {
    return res.status(400).json({
      error: "Informar o CEP como número, sem o Hífen. Com seus 8 algorismos",
    });
  } else if (typeof sacasCafe != "number") {
    return res.status(400).json({
      error: "Informar a quantidade de sacas de café, em formato númerico",
    });
  } else if (regexDate.test(vencimentoPagamento) == false) {
    return res.status(400).json({
      error:
        "A data precisa ser do tipo (Dia - Mês - Ano) (DD-MM-AAAA). Exemplo : 01-01-2001",
    });
  } else {
    let dateToConvert = req.body.vencimentoPagamento.toString().split("-");

    let date = new Date(
      `${dateToConvert[2]}-${dateToConvert[1]}-${dateToConvert[0]}`
    );

    req.body.vencimentoPagamento = date;

    next();
  }
}

export default verificarInputs;
