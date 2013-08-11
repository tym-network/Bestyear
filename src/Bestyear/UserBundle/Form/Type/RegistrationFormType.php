<?php

namespace Bestyear\UserBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\FormEvent;

class RegistrationFormType extends AbstractType
{
    private $class;

    /**
     * @param string $class The User class name
     */
    public function __construct($class)
    {
        $this->class = $class;
    }
    
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username', null, array('label' => 'form.username', 'translation_domain' => 'FOSUserBundle'))
            ->add('plainPassword', 'repeated', array(
                'type' => 'password',
                'options' => array('translation_domain' => 'FOSUserBundle'),
                'first_options' => array('label' => 'form.password'),
                'second_options' => array('label' => 'form.password_confirmation'),
                'invalid_message' => 'fos_user.password.mismatch',
            ))
            ->add('email', 'hidden', array('label' => 'form.email', 'translation_domain' => 'FOSUserBundle'));
        
        // Custom fields
        $builder->add('givenname');
        $builder->add('familyname');
        $builder->add('birthdate', 'text');
        $builder->add('TC', 'choice', array('choices' => array(
            'TC'=>'Tronc Commun (TC)',
            'GB'=>'Génie Biologique (GB)', 
            'GI'=>'Génie Informatique (GI)',
            'GM'=>'Génie Mécanique (GM)',
            'GP'=>'Génie des Procédés (GP)',
            'GSM'=>'Génie des Systèmes Mécanique (GSM)',
            'GSU'=>'Génie des Systèmes Urbains (GSU)')));
        $builder->add('studylevel', 'choice', array('choices' => array(
            '01'=>'01',
            '02'=>'02', 
            '03'=>'03',
            '04'=>'04',
            '05'=>'05',
            '06'=>'06',
            '07'=>'07',
            '08'=>'08',
            '09'=>'09')));
        $builder->add('streetnumber1', 'text', array('required' => false));
        $builder->add('street1', 'text', array('required' => false));
        $builder->add('postcode1', 'text', array('required' => false));
        $builder->add('city1', 'text', array('required' => false));
        $builder->add('streetnumber2', 'text', array('required' => false));
        $builder->add('street2', 'text', array('required' => false));
        $builder->add('postcode2', 'text', array('required' => false));
        $builder->add('city2', 'text', array('required' => false));
        $builder->add('phone1', 'text', array('required' => false));
        $builder->add('phone2', 'text', array('required' => false));
        $builder->add('cellphone', 'text', array('required' => false));
        $builder->add('emailoptional', 'email', array('required' => false));
        $builder->add('facebook', 'text', array('required' => false));
        $builder->add('twitter', 'text', array('required' => false));
        $builder->add('tn05_job', 'text', array('required' => false));
        $builder->add('tn05_place', 'text', array('required' => false));
        $builder->add('tn07_job', 'text', array('required' => false));
        $builder->add('tn07_place', 'text', array('required' => false));
        $builder->add('tn09_job', 'text', array('required' => false));
        $builder->add('tn09_place', 'text', array('required' => false));
        $builder->add('tn10_job', 'text', array('required' => false));
        $builder->add('tn10_place', 'text', array('required' => false));
        $builder->addEventListener(FormEvents::BIND,function(FormEvent $event){
            $data = $event->getData();
            $form = $event->getForm();
            if (!$data instanceof User) {
                return;
            }
            $data->setEmail($data->getUsername()."@etu.utc.fr");
        });
    }
    
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => $this->class,
            'intention'  => 'registration',
        ));
    }

    public function getName()
    {
        return 'bestyear_user_registration';
    }
}