class CriarLink {
    elements = {
        btnGrupoDeLinks: () => cy.get('.border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'),
        btnNovoLink: () => cy.get('.relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'),
        btnAtivo: () => cy.get('.translate-x-0 inline-block h-5 w-5 rounded-full bg-gray-200 shadow transform ring-0 transition ease-in-out duration-200'),
        nome: () => cy.get('#name'),
        link: () => cy.get('#link'),
        btnControleDeAcesso: () => cy.get('.bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'),
        btnGeolocalizacao: () => cy.get('.bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'),
        btnSalvar: () => cy.get('.ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'),

        mensagemSucesso: () => cy.contains('Sucesso!').parent(),
        mensagemErro: () => cy.contains('Erro!').parent(),
    }
    clickGrupoDeLinks() {
        this.elements.btnGrupoDeLinks().click()
    }
    clickNovoLink() {
        this.elements.btnNovoLink().click()
    }
    clickAtivo() {
        this.elements.btnAtivo().click()
    }
    typeNome(text) {
        if (!text) return
        this.elements.nome().type(text)
    }
    typeLink(text) {
        if (!text) return
        this.elements.link().type(text)
    }
    clickControleDeAcesso() {
        this.elements.btnControleDeAcesso().click()
    }
    clickGeolocalizacao() {
        this.elements.btnGeolocalizacao().click()
    }
    clickSalvar() {
        this.elements.btnSalvar().click()
    }
}
const criarNovoLink = new CriarLink()

describe('Criar novo Link', () => {
    describe('Criar Link com 256 caracteres no nome', () =>{
        const input = {
            nome: 'Aenean placerat. In vulputate urna eu arcu. Aliquam erat volutpat. Suspendisse potenti. Morbi mattis felis at nunc. Duis viverra diam non justo. In nisl. Nullam sit amet magna in magna gravida vehicula. Mauris tincidunt sem sed arcu. Nunc posuere. Nullam l',
            link: 'Meu Link'
        }

        it('Dado que o usuário está autenticado', () => {
            cy.getLocalStorage('4invite@user').then(($authData => {
                expect($authData.isAuthenticated === true)
            }))
        });
        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups')
        })
        it('Clico no botão Novo Link de um Grupo', {
            defaultCommandTimeout: 40000
        }, () => {
            cy.contains('Novo Link').click()
        })
        it('Clico em ativo', () => {
            cy.contains('Ativo').click()
        })
        it(`Quando entro com ${input.nome} no campo nome`, () => {
            criarNovoLink.typeNome(input.nome)
        })
        it(`Quando entro com ${input.link} no campo link`, () => {
            criarNovoLink.typeLink(input.link)
        })
        it('Clico em salvar', () => {
            cy.contains('Salvar').click()
        })
        it(`Então deve aparecer a mensagem de erro`, {
            defaultCommandTimeout: 60000
        }, () => {
            criarNovoLink.elements
                .mensagemErro()
                .should(
                    'be.visible',
                    'contains.text',
                    'The name may not be greater than 255 characters.'
                )
        })
    })
    describe('Criar Link com 0 caracteres no caminho', () =>{
        const input = {
            nome: 'Aenean placerat. In vulputate urna eu ar',
            link: ''
        }

        it('Dado que o usuário está autenticado', () => {
            cy.getLocalStorage('4invite@user').then(($authData => {
                expect($authData.isAuthenticated === true)
            }))
        });
        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups')
        })
        it('Clico no botão Novo Link de um Grupo', {
            defaultCommandTimeout: 20000
        }, () => {
            cy.contains('Novo Link').click()
        })
        it('Clico em ativo', () => {
            cy.contains('Ativo').click()
        })
        it(`Quando entro com ${input.nome} no campo nome`, () => {
            criarNovoLink.typeNome(input.nome)
        })
        it(`Quando entro com ${input.link} no campo link`, () => {
            criarNovoLink.typeLink(input.link)
        })
        it('Clico em salvar', () => {
            cy.contains('Salvar').click()
        })
        it(`Então deve aparecer a mensagem de erro`, {
            defaultCommandTimeout: 60000
        }, () => {
            criarNovoLink.elements
                .mensagemErro()
                .should(
                    'be.visible',
                    'contains.text',
                    'The name may not be greater than 255 characters.'
                )
        })
    })
})