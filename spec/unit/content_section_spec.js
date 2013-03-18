define(['ender', 'canon/content_section'], function ($, ContentSection) {
  describe('ContentSection', function () {

    var element, section;

    beforeEach(function () {
      fixture.innerHTML = '<div class="collapsible-section">' +
        '<div class="content-section-header"></div>' +
        '</div>';

      element = $('.collapsible-section');
      section = new ContentSection();
    });

    afterEach(function () {
      section.dispose();
    });

    describe('#attach', function () {
      it('succeeds when element has content-section', function () {
        (function () { section.attach(element); }).should.not.throws();
      });

      it('fails when element has other class', function () {
        element.removeClass('collapsible-section');
        element.addClass('invalid');

        (function () { section.attach(element); }).should.throws('Component must be attached to element with "collapsible-section".');
      });

      it('fails when already attached', function () {
        section.attach(element);

        (function () { section.attach(element); }).should.throws('Component is already attached.');
      });
    });

    describe('#collapse', function () {
      it('adds collapsed', function () {
        section.attach(element);
        section.collapse();

        element.hasClass('collapsed').should.equal(true);
      });
    });

    describe('#expand', function () {
      it('removes collapsed', function () {
        section.attach(element);
        section.collapse();
        section.expand();

        element.hasClass('collapsed').should.equal(false);
      });
    });

    describe('#toggle', function () {
      beforeEach(function () {
        section.attach(element);
      });

      it('adds collapsed when it is expanded', function () {
        section.expand();
        section.toggle();

        element.hasClass('collapsed').should.equal(true);
      });

      it('removes collapsed when it is collapsed', function () {
        section.collapse();
        section.toggle();

        element.hasClass('collapsed').should.equal(false);
      });

      it('is called when header is clicked', function () {
        section.toggle = sinon.spy();

        $('.content-section-header', element).click();

        section.toggle.should.have.been.called;
      });
    });

    describe('#dispose', function () {
      beforeEach(function () {
        section.attach(element);
      });

      it('discards DOM reference', function () {
        section.dispose();

        expect(section.getElement()).to.equal(null);
      });

      it('removes event listeners', function () {

        var element;

        element = section.getElement();
        element.off = sinon.spy();

        section.dispose();

        element.off.should.have.been.calledWith('click.content-section');
      });
    });
  });
});
