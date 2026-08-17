const SENHA_EQUIPE_HASH = "ec770f1e09a9e367f19056f0651be67188afef506634ae3216188a5f4086d617";

const CONTATO_GIOVANNA =
    "Giovanna Menezes — (21) 97276-0496";

const CONTATO_THIAGO =
    "Thiago de Oliveira — (21) 99564-7745";


const estoqueInicial = [

    ["Arduino Mega 2560", "Placa Arduino Mega", 8],
    ["Arduino Nano", "Placa Arduino Nano", 2],
    ["Raspberry Pi Pico", "Placa Raspberry Pi Pico", 1],
    ["Cabo Arduino (USB A/B)", "Cabo para Arduino com USB A/B", 6],
    ["Cabo Arduino MicroUSB", "Cabo para Arduino com MicroUSB", 4],
    ["Protoboard Grande", "Placa de Prototipagem", 3],
    ["Protoboard Pequena", "Metade da Placa de Prototipagem Grande", 1],
    ["MPU6050", "Sensor Giroscópio/Acelerômetro/Temperatura", 10],
    ["DHT11", "Sensor de Temperatura e Umidade", 16],
    ["Servo MG90S", "Servo Motor 180° com haste de metal", 2],
    ["PCA9685", "Módulo Controlador PWM", 3],
    ["RF-5V", "Receptor RF", 12],
    ["FS1000A", "Transmissor RF", 12],
    ["Buzzer", "Emissor de Som", 12],
    ["HW-028", "Sensor de Chuva/Gotas de Água", 2],
    ["LCD 1602A", "Display LCD", 8],
    ["HW-416-B", "Sensor de Presença PIR", 3],
    ["HW-504", "Módulo Joystick", 1],
    ["ULN2003", "Módulo de Controle de Motor de Passo", 8],
    ["Motor 28BYJ-48", "Motor de Passo", 31],
    ["CTRL-LED", "Controle de LED", 2],
    ["CTRL-MP3", "Controle de MP3", 2],
    ["CTRL-ARD", "Controle Arduino", 11],
    ["KEYPAD-4X4", "Teclado Numérico", 11],
    ["BAT-01", "Bateria", 1],
    ["MAG-01", "Ímã", 1],
    ["HD Full Color", "Tela LCD", 4],
    ["Piezo Sensor", "Buzzer Piezoelétrico", 2],
    ["IR Receiver", "Receptor Infravermelho", 5],
    ["HC-05", "Sensor Bluetooth", 2],
    ["DC Motor", "Motor DC", 13],
    ["Mini Protoboard", "Mini Placa de Prototipagem", 1],
    ["9R4334 12", "Módulo Eletrônico", 1],
    ["LED-GEN", "LED", 87],
    ["BTN-01", "Botão", 41],
    ["XCHC", "Boater", 1],
    ["SW-01", "Switch", 7],
    ["JOY-01", "Joystick", 4],
    ["POT-10K", "Potenciômetro", 23],
    ["HC-SR04", "Sensor Ultrassônico", 7],
    ["MQ-2", "Sensor de Gás", 2],
    ["OPT-01", "Sensor Óptico", 5],
    ["IR Sensor", "Sensor Infravermelho", 11],
    ["SH5461AS", "Display Numérico", 1],
    ["LED-Y", "LED Amarelo", 20],
    ["LED-R", "LED Vermelho", 20],
    ["LED-W", "LED Branco", 20],
    ["LED-O", "LED Laranja", 2],
    ["LED-B", "LED Azul", 5],
    ["LED-G", "LED Verde", 20],
    ["LAMP-INC", "Lâmpada Incandescente", 1],
    ["HW-170", "Placa Controladora de Servo-Motores", 3],
    ["2 Relay Module", "Módulo de Relé", 5],
    ["STEP-DRV", "Placa Controladora de Motor de Passo", 8],
    ["DC-DC Regulator", "Módulo Regulador de Tensão DC-DC", 1],
    ["DS1307", "Módulo Relógio de Tempo Real", 13],
    ["RES-220", "Resistor 220Ω", 4],
    ["RES-470", "Resistor 470Ω", 15],
    ["RES-10", "Resistor 10Ω", 3],
    ["RES-100", "Resistor 100Ω", 5],
    ["RES-1K", "Resistor 1KΩ", 40],
    ["RES-330", "Resistor 330Ω", 40],
    ["RES-10K", "Resistor 10KΩ", 40]

];


let estoque = estoqueInicial.map(function(item) {

    return {

        codigo: item[0],
        descricao: item[1],
        quantidade: item[2]

    };

});


let historico = [];

console.log("Firebase disponível:", window.firebaseDB);


/* ==================================
   FUNÇÕES BÁSICAS
================================== */

function salvar() {

    const firebaseDB = window.firebaseDB;

    if (!firebaseDB) {
        console.error("Firebase não está disponível.");
        return;
    }

    import("https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js")
        .then(function({ ref, set }) {

            return set(
                ref(firebaseDB, "estoque"),
                estoque
            );

        })
        .then(function() {

            return import(
                "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js"
            );

        })
        .then(function({ ref, set }) {

            return set(
                ref(firebaseDB, "historico"),
                historico
            );

        })
        .then(function() {

            console.log(
                "✅ Estoque e histórico salvos no Firebase!"
            );

        })
        .catch(function(erro) {

            console.error(
                "❌ Erro ao salvar no Firebase:",
                erro
            );

        });

}

function carregarDados() {

    const firebaseDB = window.firebaseDB;

    if (!firebaseDB) {
        console.error("Firebase ainda não está disponível.");
        return;
    }

    import("https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js")
        .then(function({ ref, get }) {

            return get(
                ref(firebaseDB, "estoque")
            );

        })
        .then(function(snapshot) {

            if (snapshot.exists()) {

                estoque = snapshot.val();

                console.log(
                    "Estoque carregado do Firebase!",
                    estoque
                );

            } else {

                console.log(
                    "Nenhum estoque encontrado no Firebase."
                );

            }

            return import(
                "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js"
            );

        })
        .then(function({ ref, get }) {

            return get(
                ref(firebaseDB, "historico")
            );

        })
        .then(function(snapshot) {

            if (snapshot.exists()) {

                historico = snapshot.val();

                console.log(
                    "Histórico carregado do Firebase!",
                    historico
                );

            } else {

                historico = [];

                console.log(
                    "Nenhum histórico encontrado no Firebase."
                );

            }

            mostrarEstoque();
            carregarItensRetirada();

        })
        .catch(function(erro) {

            console.error(
                "Erro ao carregar dados do Firebase:",
                erro
            );

        });

}

/* ==================================
   NAVEGAÇÃO
================================== */

function esconderTelas() {

    document
        .querySelectorAll(".tela")
        .forEach(function(tela) {

            tela.style.display = "none";

        });

}


function mostrarTela(nome) {

    esconderTelas();

    const tela =
        document.getElementById(
            "tela-" + nome
        );


    if (!tela) {

        alert(
            "Erro: a tela " +
            nome +
            " não foi encontrada."
        );

        return;

    }


    tela.style.display = "block";


    if (nome === "retirada") {

        carregarItensRetirada();

    }


    if (nome === "estoque") {

        mostrarEstoque();

    }


    window.scrollTo({

        top: tela.offsetTop - 20,

        behavior: "smooth"

    });

}


function voltarMenu() {

    esconderTelas();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ==================================
   MENSAGEM
================================== */

function mostrarMensagem(texto) {

    const mensagem =
        document.getElementById("mensagem");


    mensagem.innerHTML = texto;

    mensagem.style.display = "block";


    setTimeout(function() {

        mensagem.style.display = "none";

    }, 6000);

}


/* ==================================
   RETIRADA
================================== */

function carregarItensRetirada() {

    const selects =
        document.querySelectorAll(
            ".item-retirada-select"
        );


    selects.forEach(function(select) {

        const valorAtual = select.value;

        select.innerHTML =
            '<option value="">Selecione um item</option>';


        estoque.forEach(function(item) {

            const option =
                document.createElement("option");


            option.value =
                item.codigo;


            option.textContent =
                item.codigo +
                " — disponível: " +
                item.quantidade;


            select.appendChild(option);

        });


        const outro =
            document.createElement("option");


        outro.value = "outro";

        outro.textContent = "Outro";


        select.appendChild(outro);


        if (valorAtual) {

            select.value = valorAtual;

        }

    });

}


function adicionarItemRetirada() {

    const lista =
        document.getElementById(
            "lista-itens-retirada"
        );


    const linha =
        document.createElement("div");


    linha.className =
        "item-retirada-linha";


    linha.innerHTML = `

        <select
            class="item-retirada-select"
            onchange="mostrarOutroRetirada(this)"
        >

            <option value="">
                Selecione um item
            </option>

        </select>


        <input
            type="number"
            class="quantidade-retirada-item"
            min="1"
            placeholder="Qtd."
        >

    `;


    lista.appendChild(linha);


    carregarItensRetirada();

}


function mostrarOutroRetirada(select) {

    /*
     * Para manter o visual anterior simples,
     * o campo "Outro" aparece logo abaixo
     * da linha correspondente.
     */

    const linha =
        select.closest(
            ".item-retirada-linha"
        );


    const antigo =
        linha.nextElementSibling;


    if (
        antigo &&
        antigo.classList.contains(
            "outro-retirada-container"
        )
    ) {

        antigo.remove();

    }


    if (select.value !== "outro") {

        return;

    }


    const campo =
        document.createElement("div");


    campo.className =
        "outro-retirada-container";


    campo.innerHTML = `

        <label>
            Qual item?
        </label>

        <input
            type="text"
            class="outro-retirada-input"
            placeholder="Digite o nome do item"
        >

    `;


    linha.parentNode.insertBefore(
        campo,
        linha.nextSibling
    );

}


function alterarTipoRetirada() {

    const tipo =
        document.querySelector(
            'input[name="tipo-retirada"]:checked'
        );


    const aviso =
        document.getElementById(
            "aviso-externo"
        );


    if (tipo.value === "externo") {

        aviso.style.display = "block";

    } else {

        aviso.style.display = "none";

    }

}


function registrarRetirada() {

    const nome =
        document
            .getElementById("nome-retirada")
            .value
            .trim();


    const telefone =
        document
            .getElementById("telefone-retirada")
            .value
            .trim();


    const email =
        document
            .getElementById("email-retirada")
            .value
            .trim();


    const tipo =
        document.querySelector(
            'input[name="tipo-retirada"]:checked'
        ).value;


    if (!nome || !telefone || !email) {

        mostrarMensagem(
            "⚠️ Preencha nome, celular e e-mail."
        );

        return;

    }


    const linhas =
        document.querySelectorAll(
            ".item-retirada-linha"
        );


    const itensSelecionados = [];


    for (const linha of linhas) {

        const select =
            linha.querySelector(
                ".item-retirada-select"
            );


        const quantidade =
            Number(
                linha.querySelector(
                    ".quantidade-retirada-item"
                ).value
            );


        if (!select.value) {

            continue;

        }


        if (!quantidade || quantidade < 1) {

            mostrarMensagem(
                "⚠️ Informe uma quantidade válida para cada item."
            );

            return;

        }


        let nomeItem = "";

        let codigoItem = null;


        if (select.value === "outro") {

            const campo =
                linha.nextElementSibling;


            const input =
                campo
                    ? campo.querySelector(
                        ".outro-retirada-input"
                    )
                    : null;


            nomeItem =
                input
                    ? input.value.trim()
                    : "";


            if (!nomeItem) {

                mostrarMensagem(
                    "⚠️ Digite qual é o outro item."
                );

                return;

            }

        } else {

            const item =
                estoque.find(function(x) {

                    return x.codigo === select.value;

                });


            if (!item) {

                mostrarMensagem(
                    "⚠️ Item não encontrado."
                );

                return;

            }


            if (quantidade > item.quantidade) {

                mostrarMensagem(
                    "⚠️ Quantidade indisponível para " +
                    item.codigo +
                    "."
                );

                return;

            }


            nomeItem = item.codigo;

            codigoItem = item.codigo;

        }


        itensSelecionados.push({

            item: nomeItem,
            codigo: codigoItem,
            quantidade: quantidade

        });

    }


    if (itensSelecionados.length === 0) {

        mostrarMensagem(
            "⚠️ Selecione pelo menos um item."
        );

        return;

    }


    /*
     * Confere todos os itens antes de alterar
     * o estoque. Assim não acontece de um item
     * ser retirado e outro dar erro depois.
     */

    for (const selecionado of itensSelecionados) {

        if (selecionado.codigo) {

            const item =
                estoque.find(function(x) {

                    return x.codigo ===
                        selecionado.codigo;

                });


            if (
                !item ||
                selecionado.quantidade >
                item.quantidade
            ) {

                mostrarMensagem(
                    "⚠️ Quantidade indisponível para " +
                    selecionado.item +
                    "."
                );

                return;

            }

        }

    }


    itensSelecionados.forEach(function(selecionado) {

        if (selecionado.codigo) {

            const item =
                estoque.find(function(x) {

                    return x.codigo ===
                        selecionado.codigo;

                });


            item.quantidade -=
                selecionado.quantidade;

        }


        const registro = {

            id: Date.now() +
                Math.floor(
                    Math.random() * 100000
                ),

            tipo: "retirada",

            nome: nome,

            telefone: telefone,

            email: email,

            item: selecionado.item,

            codigo: selecionado.codigo,

            quantidade:
                selecionado.quantidade,

            modalidade: tipo,

            status:
                tipo === "interno"
                    ? "Retirada aprovada"
                    : "Aguardando confirmação da equipe",

            data:
                new Date().toLocaleString("pt-BR")

        };


        historico.push(registro);

    });


    salvar();


    if (tipo === "externo") {

        mostrarMensagem(
            "⏳ Retirada registrada e aguardando confirmação da equipe. Para agilizar o atendimento, entre em contato com " +
            CONTATO_GIOVANNA +
            " ou " +
            CONTATO_THIAGO +
            "."
        );

    } else {

        mostrarMensagem(
            "✅ Retirada registrada com sucesso!"
        );

    }


    document
        .getElementById("nome-retirada")
        .value = "";


    document
        .getElementById("telefone-retirada")
        .value = "";


    document
        .getElementById("email-retirada")
        .value = "";


    document
        .getElementById(
            "lista-itens-retirada"
        )
        .innerHTML = `

            <div class="item-retirada-linha">

                <select
                    class="item-retirada-select"
                    onchange="mostrarOutroRetirada(this)"
                >

                    <option value="">
                        Selecione um item
                    </option>

                </select>


                <input
                    type="number"
                    class="quantidade-retirada-item"
                    min="1"
                    placeholder="Qtd."
                >

            </div>

        `;


    carregarItensRetirada();

}


/* ==================================
   ESTOQUE
================================== */

function mostrarEstoque() {

    const lista =
        document.getElementById(
            "lista-estoque"
        );


    lista.innerHTML = "";


    estoque.forEach(function(item) {

        let classe = "";


        if (item.quantidade === 0) {

            classe = "esgotado";

        } else if (item.quantidade <= 3) {

            classe = "baixa";

        }


        const div =
            document.createElement("div");


        div.className =
            "item-estoque";


        div.innerHTML = `

            <div>

                <strong>
                    ${item.codigo}
                </strong>

                <small>
                    ${item.descricao}
                </small>

            </div>


            <div class="quantidade ${classe}">

                ${item.quantidade}

                <small>
                    disponível
                </small>

            </div>

        `;


        lista.appendChild(div);

    });


    document
        .getElementById("contador-itens")
        .textContent =
        estoque.length +
        " itens cadastrados";

}


/* ==================================
   MEU HISTÓRICO
================================== */

function consultarMeuHistorico() {

    const busca =
        document
            .getElementById("consulta-historico")
            .value
            .trim()
            .toLowerCase();


    const resultado =
        document.getElementById(
            "resultado-meu-historico"
        );


    const aviso =
        document.getElementById(
            "aviso-devolucao-historico"
        );


    resultado.innerHTML = "";

    aviso.style.display = "none";


    if (!busca) {

        resultado.innerHTML =
            '<div class="aviso">Digite seu celular ou e-mail.</div>';

        return;

    }


    const registros =
        historico.filter(function(registro) {

            return (

                registro.tipo === "retirada"

                &&

                (

                    registro.telefone
                        .toLowerCase()
                        .includes(busca)

                    ||

                    registro.email
                        .toLowerCase()
                        .includes(busca)

                )

            );

        });


    if (registros.length === 0) {

        resultado.innerHTML =
            '<div class="aviso">Nenhuma retirada encontrada.</div>';

        return;

    }


    registros
        .slice()
        .reverse()
        .forEach(function(registro) {

            const div =
                document.createElement("div");


            div.className =
                "registro";


            let botaoDevolver = "";


            if (

                registro.status ===
                    "Retirada aprovada"

                ||

                registro.status ===
                    "Aguardando confirmação da equipe"

            ) {

                botaoDevolver = `

                    <button
                        class="botao-principal"
                        onclick="solicitarDevolucao(${registro.id})"
                    >

                        📥 Devolver

                    </button>

                `;

            }


            div.innerHTML = `

                <strong>
                    ${registro.item}
                </strong>

                <p>
                    Quantidade:
                    ${registro.quantidade}
                </p>

                <p>
                    Tipo:
                    ${registro.modalidade}
                </p>

                <p>
                    Status:
                    ${registro.status}
                </p>

                <p>
                    Data:
                    ${registro.data}
                </p>

                ${botaoDevolver}

            `;


            resultado.appendChild(div);

        });

}


function solicitarDevolucao(id) {

    const registro =
        historico.find(function(item) {

            return item.id === id;

        });


    if (!registro) {

        mostrarMensagem(
            "⚠️ Retirada não encontrada."
        );

        return;

    }


    if (

        registro.status ===
            "Devolução pendente"

        ||

        registro.status ===
            "Devolução confirmada"

    ) {

        mostrarMensagem(
            "⚠️ A devolução deste item já foi registrada."
        );

        return;

    }


    registro.status =
        "Devolução pendente";


    registro.dataDevolucao =
        new Date().toLocaleString("pt-BR");


    salvar();


    const aviso =
        document.getElementById(
            "aviso-devolucao-historico"
        );


    aviso.style.display = "block";


    mostrarMensagem(
        "⏳ Devolução registrada. Coloque o item na caixa sinalizada com “DEVOLVA SEU ITEM AQUI”. A equipe de robótica irá averiguar e confirmar a devolução."
    );


    consultarMeuHistorico();

}


/* ==================================
   ÁREA DA EQUIPE
================================== */

async function entrarEquipe() {

    const senha =
        document
            .getElementById("senha-equipe")
            .value;


    const senhaHash =
        await gerarHashSenha(senha);


    if (senhaHash !== SENHA_EQUIPE_HASH) {

        mostrarMensagem(
            "❌ Senha incorreta."
        );

        return;

    }


    document
        .getElementById("login-equipe")
        .style.display = "none";


    document
        .getElementById("painel-equipe")
        .style.display = "block";


    mostrarHistoricoEquipe();

}


async function gerarHashSenha(texto) {

    const encoder =
        new TextEncoder();


    const dados =
        encoder.encode(texto);


    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            dados
        );


    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );


    return hashArray
        .map(function(b) {

            return b
                .toString(16)
                .padStart(2, "0");

        })
        .join("");

}


function mostrarHistoricoEquipe() {

    const conteudo =
        document.getElementById(
            "conteudo-equipe"
        );


    conteudo.innerHTML = "";


    const registros =
        historico
            .filter(function(item) {

                return item.tipo === "retirada";

            })
            .slice()
            .reverse();


    if (registros.length === 0) {

        conteudo.innerHTML =
            '<div class="aviso">Nenhuma retirada registrada.</div>';

        return;

    }


    registros.forEach(function(registro) {

        const div =
            document.createElement("div");


        div.className =
            "registro";


        div.innerHTML = `

            <strong>
                ${registro.item}
            </strong>

            <p>
                👤 ${registro.nome}
            </p>

            <p>
                📞 ${registro.telefone}
            </p>

            <p>
                📧 ${registro.email}
            </p>

            <p>
                Quantidade:
                ${registro.quantidade}
            </p>

            <p>
                Tipo:
                ${registro.modalidade}
            </p>

            <p>
                Status:
                ${registro.status}
            </p>

            <p>
                Data:
                ${registro.data}
            </p>

        `;


        conteudo.appendChild(div);

    });

}


/* ==================================
   RETIRADAS EXTERNAS PENDENTES
================================== */

function mostrarRetiradasPendentes() {

    const conteudo =
        document.getElementById(
            "conteudo-equipe"
        );


    conteudo.innerHTML = "";


    const pendentes =
        historico.filter(function(registro) {

            return (

                registro.tipo === "retirada"

                &&

                registro.modalidade === "externo"

                &&

                registro.status ===
                    "Aguardando confirmação da equipe"

            );

        });


    if (pendentes.length === 0) {

        conteudo.innerHTML =
            '<div class="aviso">Nenhuma retirada externa pendente.</div>';

        return;

    }


    pendentes.forEach(function(registro) {

        const div =
            document.createElement("div");


        div.className =
            "pendente";


        div.innerHTML = `

            <strong>
                📤 Retirada externa pendente
            </strong>

            <p>
                👤 ${registro.nome}
            </p>

            <p>
                📞 ${registro.telefone}
            </p>

            <p>
                📧 ${registro.email}
            </p>

            <p>
                📦 ${registro.item}
                — ${registro.quantidade} unidade(s)
            </p>

            <p>
                🕐 ${registro.data}
            </p>


            <button
                class="botao-aprovar"
                onclick="aprovarRetirada(${registro.id})"
            >

                ✓ Confirmar retirada

            </button>


            <button
                class="botao-rejeitar"
                onclick="rejeitarRetirada(${registro.id})"
            >

                ✕ Rejeitar

            </button>

        `;


        conteudo.appendChild(div);

    });

}


function aprovarRetirada(id) {

    const registro =
        historico.find(function(item) {

            return item.id === id;

        });


    if (!registro) return;


    registro.status =
        "Retirada aprovada";


    salvar();


    mostrarRetiradasPendentes();

}


function rejeitarRetirada(id) {

    const registro =
        historico.find(function(item) {

            return item.id === id;

        });


    if (!registro) return;


    if (registro.codigo) {

        const item =
            estoque.find(function(x) {

                return x.codigo ===
                    registro.codigo;

            });


        if (item) {

            item.quantidade +=
                registro.quantidade;

        }

    }


    registro.status =
        "Retirada rejeitada";


    salvar();


    mostrarRetiradasPendentes();


    mostrarMensagem(
        "❌ Retirada rejeitada e estoque restaurado."
    );

}


/* ==================================
   DEVOLUÇÕES PENDENTES
================================== */

function mostrarDevolucoesPendentes() {

    const conteudo =
        document.getElementById(
            "conteudo-equipe"
        );


    conteudo.innerHTML = "";


    const pendentes =
        historico.filter(function(registro) {

            return (

                registro.tipo === "retirada"

                &&

                registro.status ===
                    "Devolução pendente"

            );

        });


    if (pendentes.length === 0) {

        conteudo.innerHTML =
            '<div class="aviso">Nenhuma devolução pendente.</div>';

        return;

    }


    pendentes.forEach(function(registro) {

        const div =
            document.createElement("div");


        div.className =
            "pendente";


        div.innerHTML = `

            <strong>
                📥 Devolução pendente
            </strong>

            <p>
                👤 ${registro.nome}
            </p>

            <p>
                📞 ${registro.telefone}
            </p>

            <p>
                📧 ${registro.email}
            </p>

            <p>
                📦 ${registro.item}
                — ${registro.quantidade} unidade(s)
            </p>

            <p>
                📅 ${registro.dataDevolucao || "Não informado"}
            </p>

            <p>
                O item deve ser colocado na caixa sinalizada
                com <strong>“DEVOLVA SEU ITEM AQUI”</strong>
                para que a equipe de robótica possa averiguar
                o material.
            </p>

            <p>
                Entraremos em contato pelos meios
                de comunicação informados.
            </p>


            <button
                class="botao-aprovar"
                onclick="aprovarDevolucao(${registro.id})"
            >

                ✓ Confirmar devolução

            </button>

        `;


        conteudo.appendChild(div);

    });

}


/* ==================================
   CONFIRMAR DEVOLUÇÃO
================================== */

function aprovarDevolucao(id) {

    const registro =
        historico.find(function(item) {

            return item.id === id;

        });


    if (!registro) return;


    if (
        registro.status !==
        "Devolução pendente"
    ) {

        return;

    }


    let item =
        estoque.find(function(x) {

            return x.codigo ===
                registro.codigo;

        });


    if (item) {

        item.quantidade +=
            registro.quantidade;

    } else {

        estoque.push({

            codigo:
                registro.codigo ||
                registro.item,

            descricao:
                "Item devolvido",

            quantidade:
                registro.quantidade

        });

    }


    registro.status =
        "Devolução confirmada";


    registro.dataConfirmacao =
        new Date().toLocaleString("pt-BR");


    salvar();


    mostrarDevolucoesPendentes();


    mostrarMensagem(
        "✅ Devolução confirmada e estoque atualizado."
    );

}


/* ==================================
   GERENCIAR ESTOQUE
================================== */

function mostrarGerenciarEstoque() {

    const conteudo =
        document.getElementById(
            "conteudo-equipe"
        );


    conteudo.innerHTML = `

        <div class="cadastro-item">

            <h3>
                ➕ Cadastrar item
            </h3>

            <label>
                Nome/código do item:
            </label>

            <input
                type="text"
                id="novo-item-codigo"
                placeholder="Ex.: Arduino Uno"
            >


            <label>
                Descrição:
            </label>

            <input
                type="text"
                id="novo-item-descricao"
                placeholder="Descrição do item"
            >


            <label>
                Quantidade inicial:
            </label>

            <input
                type="number"
                id="novo-item-quantidade"
                min="0"
                placeholder="Quantidade"
            >


            <button
                class="botao-principal"
                onclick="cadastrarItem()"
            >

                ➕ Cadastrar item

            </button>

        </div>


        <h3>
            📦 Alterar quantidade
        </h3>

        <div id="lista-gerenciar-estoque"></div>

    `;


    const lista =
        document.getElementById(
            "lista-gerenciar-estoque"
        );


    estoque.forEach(function(item, indice) {

        const div =
            document.createElement("div");


        div.className =
            "gerenciar-item";


        div.innerHTML = `

            <strong>
                ${item.codigo}
            </strong>

            <p>
                ${item.descricao}
            </p>

            <p>
                Quantidade atual:
                <strong>
                    ${item.quantidade}
                </strong>
            </p>


            <div class="controle-quantidade">

                <input
                    type="number"
                    id="quantidade-${indice}"
                    min="0"
                    value="${item.quantidade}"
                >


                <button
                    onclick="alterarQuantidade(${indice})"
                >

                    Salvar

                </button>

            </div>

        `;


        lista.appendChild(div);

    });

}


function alterarQuantidade(indice) {

    const campo =
        document.getElementById(
            "quantidade-" + indice
        );


    const quantidade =
        Number(campo.value);


    if (isNaN(quantidade) || quantidade < 0) {

        mostrarMensagem(
            "⚠️ Informe uma quantidade válida."
        );

        return;

    }


    estoque[indice].quantidade =
        quantidade;


    salvar();


    mostrarGerenciarEstoque();


    mostrarMensagem(
        "✅ Quantidade atualizada."
    );

}


function cadastrarItem() {

    const codigo =
        document
            .getElementById("novo-item-codigo")
            .value
            .trim();


    const descricao =
        document
            .getElementById("novo-item-descricao")
            .value
            .trim();


    const quantidade =
        Number(
            document
                .getElementById(
                    "novo-item-quantidade"
                )
                .value
        );


    if (!codigo || !descricao) {

        mostrarMensagem(
            "⚠️ Preencha o nome/código e a descrição."
        );

        return;

    }


    if (
        isNaN(quantidade) ||
        quantidade < 0
    ) {

        mostrarMensagem(
            "⚠️ Informe uma quantidade válida."
        );

        return;

    }


    const existente =
        estoque.find(function(item) {

            return item.codigo.toLowerCase() ===
                codigo.toLowerCase();

        });


    if (existente) {

        mostrarMensagem(
            "⚠️ Esse item já está cadastrado."
        );

        return;

    }


    estoque.push({

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade

    });


    salvar();


    mostrarGerenciarEstoque();


    mostrarMensagem(
        "✅ Item cadastrado com sucesso."
    );

}


/* ==================================
   INICIALIZAÇÃO
================================== */

carregarDados();