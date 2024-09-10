import {random} from "mathjs";

class CreateLinkForm {
    elements = {
        novoLinkBtn: () => cy.get('button[type="button"]').contains('Novo Link'),
        nome: () => cy.get('#name'),
        link: () => cy.get('#link'),
        submit: () => cy.get('button[type="submit"]'),
        geolocalizacao: () =>
            cy
                .contains('Geolocalização')
                .parent()
                .parent()
                .find('button[type="button"]'),
        ativo: () =>
            cy
                .contains('Ativo')
                .parent()
                .parent()
                .find('button[type="button"]'),
        tokenDeAcesso: () =>
            cy
                .contains('Controle de Acesssos')
                .parent()
                .parent()
                .find('button[type="button"]'),
        mensagemSucesso: () => cy.contains('Link adicionado ou grupo com sucesso!'),
        mensagemErro1: () => cy.contains('O campo link é obrigatório'),
        mensagemErro2: () => cy.contains('O campo nome é obrigatório'),
        mensagemErro3: () => cy.contains('O nome não pode ter mais do que 255 caracteres')
    }
    clickNovoLink() {
        this.elements.novoLinkBtn().click()
    }
    typeNome(text) {
        if (!text) return
        this.elements.nome().type(text)
    }
    typeLink(text) {
        if (!text) return
        this.elements.link().type(text)
    }
    clickGeolocalizacao() {
        this.elements.geolocalizacao().click()
    }
    clickAtivo() {
        this.elements.ativo().click()
    }
    clickTokenDeAcesso() {
        this.elements.tokenDeAcesso().click()
    }
    clickSubmit() {
        this.elements.submit().click()
    }
}
const createLinkForm = new CreateLinkForm()
function getRandomInt(min, max) { // Número aleatório para o link
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
const indice = getRandomInt(1, 100);
describe('Criar Link', () => {
    describe('Criar Link Com Sucesso', () => {
        const input = {
            nome: 'Link '+indice,
            link: 'linkteste'+indice+'.com',
        }
        it('Dado que o usuário está autenticado', () => {
            cy.getLocalStorage('4invite@user').then(($authData => {
                expect($authData.isAuthenticated === true)
            }))
        });
        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups')
        })
        it('E clico em Novo Link', {
            defaultCommandTimeout: 60000
        }, () => {
            createLinkForm.clickNovoLink()
        })
        it(`Então entro com ${input.nome} no campo nome`, () => {
            createLinkForm.typeNome(input.nome)
        })
        it(`E entro com ${input.link} no campo link`, () => {
            createLinkForm.typeLink(input.link)
        })
        it(`E clico no botão Ativo`, () => {
            createLinkForm.clickAtivo()
        })
        it(`Quando clico no botão Salvar`, () => {
            createLinkForm.clickSubmit()
        })
        it(`Então deve aparecer a mensagem de sucesso`,  {
            defaultCommandTimeout: 20000
        }, () => {
            createLinkForm.elements
                .mensagemSucesso()
                .should(
                    'be.visible',
                    'contains.text',
                    'Link adicionado ou grupo com sucesso!'
                )
        })
    })
})

describe('Criar Link', () => {
    describe('Criar Link sem inserir o link', () => {
        const input = {
            nome: 'Link '+indice,
            link: ' ',
        }
        it('Dado que o usuário está autenticado', () => {
            cy.getLocalStorage('4invite@user').then(($authData => {
                expect($authData.isAuthenticated === true)
            }))
        });
        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups')
        })
        it('E clico em Novo Link', {
            defaultCommandTimeout: 60000
        }, () => {
            createLinkForm.clickNovoLink()
        })
        it(`Então entro com ${input.nome} no campo nome`, () => {
            createLinkForm.typeNome(input.nome)
        })
        it(`E entro com ${input.link} no campo link`, () => {
            createLinkForm.typeLink(input.link)
        })
        it(`E clico no botão Ativo`, () => {
            createLinkForm.clickAtivo()
        })
        it(`Quando clico no botão Salvar`, () => {
            createLinkForm.clickSubmit()
        })
        it(`Então deve aparecer a mensagem de erro`,  {
            defaultCommandTimeout: 20000
        }, () => {
            createLinkForm.elements
                .mensagemErro1()
                .should(
                    'be.visible',
                    'contains.text',
                    'O campo link é obrigatório'
                )
        })
    })
})

describe('Criar Link', () => {
    describe('Criar Link sem inserir o nome', () => {
        const input = {
            nome: ' ',
            link: 'link'+indice+'.com',
        }
        it('Dado que o usuário está autenticado', () => {
            cy.getLocalStorage('4invite@user').then(($authData => {
                expect($authData.isAuthenticated === true)
            }))
        });
        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups')
        })
        it('E clico em Novo Link', {
            defaultCommandTimeout: 60000
        }, () => {
            createLinkForm.clickNovoLink()
        })
        it(`Então entro com ${input.nome} no campo nome`, () => {
            createLinkForm.typeNome(input.nome)
        })
        it(`E entro com ${input.link} no campo link`, () => {
            createLinkForm.typeLink(input.link)
        })
        it(`E clico no botão Ativo`, () => {
            createLinkForm.clickAtivo()
        })
        it(`Quando clico no botão Salvar`, () => {
            createLinkForm.clickSubmit()
        })
        it(`Então deve aparecer a mensagem de erro`,  {
            defaultCommandTimeout: 20000
        }, () => {
            createLinkForm.elements
                .mensagemErro2()
                .should(
                    'be.visible',
                    'contains.text',
                    'O campo nome é obrigatório'
                )
        })
    })
})

describe('Criar Link', () => {
    describe('Criar Link com nome inválido', () => {
        const input = {
            nome: 'Cum dolor labore ex quod nesciunt id odit pariatur cum alias explicabo. Non nihil dolorem aut excepturi quam in voluptatem perferendis ut nesciunt nemo qui voluptas numquam non dolorem corrupti. Et commodi voluptas sed consectetur molestias in ut voluptatem',
            link: 'link'+indice+'.com',
        }
        it('Dado que o usuário está autenticado', () => {
            cy.getLocalStorage('4invite@user').then(($authData => {
                expect($authData.isAuthenticated === true)
            }))
        });
        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups')
        })
        it('E clico em Novo Link', {
            defaultCommandTimeout: 60000
        }, () => {
            createLinkForm.clickNovoLink()
        })
        it(`Então entro com ${input.nome} no campo nome`, () => {
            createLinkForm.typeNome(input.nome)
        })
        it(`E entro com ${input.link} no campo link`, () => {
            createLinkForm.typeLink(input.link)
        })
        it(`E clico no botão Ativo`, () => {
            createLinkForm.clickAtivo()
        })
        it(`Quando clico no botão Salvar`, () => {
            createLinkForm.clickSubmit()
        })
        it(`Então deve aparecer a mensagem de erro`,  {
            defaultCommandTimeout: 20000
        }, () => {
            createLinkForm.elements
                .mensagemErro3()
                .should(
                    'be.visible',
                    'contains.text',
                    'O nome não pode ter mais do que 255 caracteres'
                )
        })
    })
})